const { signUp, login } = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  describe('POST/auth/login', () => {
    it('logs a signed up user in and issues jwt', async () => {
      const data = DataFactory.user();
      try {
        const user = await signUp(data);
        const res = await login(data.email, data.password);
        expect(res.status).to.equal(201);

        const token = jwt.decode(res.body.token);
        expect(token).to.have.property('id');
        expect(token).to.contain({ id: user.body._id });
        expect(token).to.have.property('firstName');
        expect(token).to.contain({ firstName: user.body.firstName });
        expect(token).to.have.property('lastName');
        expect(token).to.contain({ lastName: user.body.lastName });
      } catch (err) {
        throw (err);
      }
    });

    it('fails to login with invalid email', async () => {
      const data = DataFactory.user();
      try {
        await signUp(data);
        const res = await login('r@r.com', data.password);
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('User not found');
      } catch (err) {
        throw (err);
      }
    });

    it('fails to login with invalid password', async () => {
      const data = DataFactory.user();
      try {
        await signUp(data);
        const res = await login(data.email, '12345678');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('User/password combination incorrect');
      } catch (err) {
        throw (err);
      }
    });
  });
});
