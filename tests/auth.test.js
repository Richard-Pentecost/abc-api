const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  describe('POST/auth/login', () => {
    it('logs a signed up user in and issues jwt', async () => {
      const data = DataFactory.user();
      const user = await UserHelpers.signUp(data);
      chai.request(server)
        .post('/auth/login')
        .send({ email: data.email, password: data.password })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          const token = jwt.decode(res.body.token);
          expect(token).to.have.property('id');
          expect(token).to.contain({ id: user.body._id });
          expect(token).to.have.property('firstName');
          expect(token).to.contain({ firstName: user.body.firstName });
          expect(token).to.have.property('lastName');
          expect(token).to.contain({ lastName: user.body.lastName });
        });
    });
  });
});
