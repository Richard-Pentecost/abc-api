const User = require('../src/models/user');
const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

describe('/users', () => {
  describe('POST /users', () => {
    it('creates a new user in the database', async () => {
      const data = DataFactory.user();
      try {
        const res = await UserHelpers.signUp(data);
        expect(res.status).to.equal(201);

        const user = await User.findById(res.body._id);
        expect(user.firstName).to.equal(data.firstName);
        expect(user.lastName).to.equal(data.lastName);
        expect(user.email).to.equal(data.email);
        expect(user.password).not.to.equal(data.password);
        expect(user.password).to.have.length(60);
        expect(res.body).not.to.have.property('password');
      } catch (err) {
        throw (err);
      }
    });

    it('validates a users email address', async () => {
      const data = DataFactory.user({ email: 'richard' });
      try {
        const res = await UserHelpers.signUp(data);
        expect(res.status).to.equal(400);
        expect(res.body.errors.email).to.equal('Invalid email address');

        const count = await User.countDocuments();
        expect(count).to.equal(0);
      } catch (err) {
        throw (err);
      }
    });

    it('validates a users email address', async () => {
      const data = DataFactory.user({ password: '1234' });
      try {
        const res = await UserHelpers.signUp(data);
        expect(res.status).to.equal(400);
        expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');

        const count = await User.countDocuments();
        expect(count).to.equal(0);
      } catch (err) {
        throw (err);
      }
    });
  });
});
