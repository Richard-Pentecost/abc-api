const { signUp, login } = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const Farm = require('../src/models/farm');

describe('/farms', () => {
  const userData = DataFactory.user();
  let user;
  let token;

  beforeEach(done => {
    signUp(userData).then(res => {
      login(userData.email, userData.password).then(credentials => {
        user = res.body;
        token = credentials.body.token;
        done();
      });
    });
  });

  describe('POST /farms', () => {
    it('creates a farm listing', done => {
      const farm = {
        name: 'Porters Hill Farmhouse',
        farmer: 'Richard Pentecost',
      };
      chai.request(server)
        .post('/farms')
        .send(farm)
        .end((err, result) => {
          expect(err).to.equal(null);
          expect(result.status).to.equal(201);
          Farm.findById(result.body._id, (error, newFarm) => {
            expect(error).to.equal(null);
            expect(newFarm.name).to.equal(farm.name);
            expect(newFarm.farmer).to.equal(farm.farmer);
          });
          done();
        });
    });

    it('validates that a farm has a name', done => {
      const farm = { farmer: 'Richard' };
      chai.request(server)
        .post('/farms')
        .send(farm)
        .end((err, result) => {
          expect(err).to.equal(null);
          expect(result.status).to.equal(400);
          expect(result.body.errors.name).to.equal('A name must be provided');
          Farm.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });
          done();
        });
    });
  });
});
