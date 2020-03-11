const { signUp, login } = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const Farm = require('../src/models/farm');

describe('/farms', () => {
  describe('POST /book', () => {
    it('creates a farm listing', async () => {
      const data = DataFactory.user();
      const user = await signUp(data);
      const credentials = await login(data.email, data.password);
      const token = credentials.body.token;

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
        });
    });

    it('validates that a farm has a name', async () => {
      const data = DataFactory.user();
      const user = await signUp(data);
      const credentials = await login(data.email, data.password);
      const token = credentials.body.token;

      const farm = {
        farmer: 'Richard Pentecost',
      };

      chai.request(server)
        .post('/farms')
        .send(farm)
        .end((err, result) => {
          expect(err).to.equal(null);
          expect(result.status).to.equal(400);
          expect(result.body.errors.name).to.equal('A name must be provided');
        });
    });
  });
});
