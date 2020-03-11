const { signUp, login } = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  describe('POST/auth/login', () => {
    it('logs a signed up user in and issues jwt', async () => {
      const data = DataFactory.user();
      const user = await signUp(data);
      const result = await login(data.email, data.password);
      const token = jwt.decode(result.body.token);

      expect(result.status).to.equal(201);
      expect(token).to.have.property('id');
      expect(token).to.contain({ id: user.body._id });
      expect(token).to.have.property('firstName');
      expect(token).to.contain({ firstName: user.body.firstName });
      expect(token).to.have.property('lastName');
      expect(token).to.contain({ lastName: user.body.lastName });
    });

    it('fails to login with invalid email', async () => {
      const data = DataFactory.user();
      await signUp(data);
      const result = await login('r@r.com', data.password);

      expect(result.status).to.equal(401);
      expect(result.body.error).to.equal('User not found');
    });

    it('fails to login with invalid password', async () => {
      const data = DataFactory.user();
      await signUp(data);
      const result = await login(data.email, '12345678');
      expect(result.status).to.equal(401);
      expect(result.body.error).to.equal('User/password combination incorrect');
    });
  });
});
