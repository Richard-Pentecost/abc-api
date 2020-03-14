const { signUp, login } = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  describe('POST/auth/login', () => {
    it('logs a signed up user in and issues jwt', (done) => {
      const data = DataFactory.user();
      signUp(data)
        .then((user) => {
          login(data.email, data.password)
            .then((res) => {
              expect(res.status).to.equal(201);
              const token = jwt.decode(res.body.token);
              expect(token).to.have.property('id');
              expect(token).to.contain({ id: user.body._id });
              expect(token).to.have.property('firstName');
              expect(token).to.contain({ firstName: user.body.firstName });
              expect(token).to.have.property('lastName');
              expect(token).to.contain({ lastName: user.body.lastName });
              done();
            });
        });
    });

    it('fails to login with invalid email', (done) => {
      const data = DataFactory.user();
      signUp(data)
        .then(() => {
          login('r@r.com', data.password)
            .then(res => {
              expect(res.status).to.equal(401);
              expect(res.body.error).to.equal('User not found');
              done();
            });
        });
    });

    it('fails to login with invalid password', (done) => {
      const data = DataFactory.user();
      signUp(data)
        .then(() => {
          login(data.email, '12345678')
            .then(res => {
              expect(res.status).to.equal(401);
              expect(res.body.error).to.equal('User/password combination incorrect');
              done();
            });
        });
    });
  });
});
