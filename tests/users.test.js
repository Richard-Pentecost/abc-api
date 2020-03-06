const mongoose = require('mongoose');
const User = require('../src/models/user');
const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

describe('/users', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', done => {
      const data = DataFactory.user();
      UserHelpers.signUp(data)
        .then(res => {
          expect(res.status).to.equal(201);
          User.findById(res.body._id, (error, user) => {
            expect(error).to.equal(null);
            expect(user.firstName).to.equal(data.firstName);
            expect(user.lastName).to.equal(data.lastName);
            expect(user.email).to.equal(data.email);
            expect(user.password).not.to.equal(data.password);
            expect(user.password).to.have.length(60);
            expect(res.body).not.to.have.property('password');
          });
          done();
        })
        .catch(error => done(error));
    });

    it('validates a users email address', done => {
      const data = DataFactory.user({ email: 'richard' });
      UserHelpers.signUp(data)
        .then(res => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.email).to.equal('Invalid email address');
          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });
          done();
        })
        .catch(error => done(error));
    });

    it('validates that a users password is at least 8 characters long', done => {
      const data = DataFactory.user({ password: '1234' });
      UserHelpers.signUp(data)
        .then(res => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');
          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });
          done();
        })
        .catch(error => done(error));
    });
  });
});
