const { signUp, login } = require('./helpers/user-helpers');
const { create } = require('./helpers/farm-helpers');
const DataFactory = require('./helpers/data-factory');
const Farm = require('../src/models/farm');

describe('/farms', () => {
  // const userData = DataFactory.user();
  // let user;
  // let token;

  // beforeEach(done => {
  //   signUp(userData).then(res => {
  //     login(userData.email, userData.password).then(credentials => {
  //       user = res.body;
  //       token = credentials.body.token;
  //       done();
  //     });
  //   });
  // });

  describe('POST /farms', () => {
    it('creates a farm listing', async () => {
      const userData = DataFactory.user();
      try {
        const user = await signUp(userData);
        const farm = {
          user: user.body._id,
          name: 'Porters Hill Farmhouse',
          farmer: 'Richard Pentecost',
        };
        const credentials = await login(userData.email, userData.password);
        const token = credentials.body.token;

        const res = await create(farm, token);
        expect(res.status).to.equal(201);

        const newFarm = await Farm.findById(res.body._id);
        expect(JSON.stringify(newFarm.user)).to.equal(JSON.stringify(farm.user));
        expect(newFarm.name).to.equal(farm.name);
        expect(newFarm.farmer).to.equal(farm.farmer);

        const count = await Farm.countDocuments();
        expect(count).to.equal(1);
      } catch (err) {
        throw (err);
      }
    });

    it('validates that a farm has a name', async () => {
      const userData = DataFactory.user();
      try {
        const user = await signUp(userData);
        const farm = {
          user: user.body._id,
          farmer: 'Richard',
        };
        const credentials = await login(userData.email, userData.password);
        const token = credentials.body.token;

        const res = await create(farm, token);
        expect(res.status).to.equal(400);
        expect(res.body.errors.name).to.equal('A name must be provided');

        const count = await Farm.countDocuments();
        expect(count).to.equal(0);
      } catch (err) {
        throw (err);
      }
    });
  });
});
