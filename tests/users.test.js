const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('/users', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', done => {
      const fakeUser = {
        firstName: 'Richard',
        lastName: 'Pentecost',
        email: 'r@r.com',
        password: '12345678',
      };
      chai.request(server)
        .post('/users')
        .send(fakeUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (error, user) => {
            expect(error).to.equal(null);
            expect(user.firstName).to.equal(fakeUser.firstName);
            expect(user.lastName).to.equal(fakeUser.lastName);
            expect(user.email).to.equal(fakeUser.email);
            expect(user.password).not.to.equal(fakeUser.password);
            expect(user.password).to.have.length(60);
            expect(res.body).not.to.have.property('password');
          });
          done();
        });
    });

    it('validates a users email address', done => {
      const fakeUser = {
        firstName: 'Richard',
        lastName: 'Pentecost',
        email: 'richard',
        password: '12345678',
      };
      chai.request(server)
        .post('/users')
        .send(fakeUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.errors.email).to.equal('Invalid email address');
          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });

    it('validates that a users password is at least 8 characters long', done => {
      const fakeUser = {
        firstName: 'Richard',
        lastName: 'Pentecost',
        email: 'r@r.com',
        password: '1234',
      };
      chai.request(server)
        .post('/users')
        .send(fakeUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters long');
          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });
  });
});
