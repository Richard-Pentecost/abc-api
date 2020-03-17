const { signUp, login } = require('./helpers/user-helpers');
const { create, createMany } = require('./helpers/farm-helpers');
const DataFactory = require('./helpers/data-factory');
const Farm = require('../src/models/farm');

describe('/farms', () => {
  const userData = DataFactory.user();
  let user;
  let token;

  beforeEach(async () => {
    user = await signUp(userData);
    const credentials = await login(userData.email, userData.password);
    token = credentials.body.token;
  });


  describe('POST /farms', () => {
    it('creates a farm listing', async () => {
      try {
        const farm = DataFactory.farm();

        const res = await create(farm, token);
        expect(res.status).to.equal(201);

        const newFarm = await Farm.findById(res.body._id);
        expect(JSON.stringify(newFarm.user)).to.equal(JSON.stringify(user.body._id));
        expect(newFarm.name).to.equal(farm.name);
        expect(newFarm.farmer).to.equal(farm.farmer);

        const count = await Farm.countDocuments();
        expect(count).to.equal(1);
      } catch (err) {
        throw (err);
      }
    });

    it('validates that a farm has a name', async () => {
      try {
        await signUp(userData);
        const farm = {
          farmer: 'Richard',
        };

        const res = await create(farm, token);
        expect(res.status).to.equal(400);
        expect(res.body.errors.name).to.equal('A name must be provided');

        const count = await Farm.countDocuments();
        expect(count).to.equal(0);
      } catch (err) {
        throw (err);
      }
    });

    it('farm listing will not be created if the user is not authorized', async () => {
      try {
        const farm = DataFactory.farm();
        const res = await chai.request(server)
          .post('/farms')
          .send(farm);

        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You are not authorized to create listing');
        const count = await Farm.countDocuments();
        expect(count).to.equal(0);
      } catch (err) {
        throw (err);
      }
    });
  });

  describe('GET /farms', () => {
    it('retrieves a list of farms', async () => {
      const farms = [
        DataFactory.farm(),
        DataFactory.farm(),
        DataFactory.farm(),
      ];
      try {
        await createMany(farms, token);
        const res = await chai.request(server)
          .get('/farms');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(farms.length);
        res.body.forEach((item, i) => {
          // console.log('item', item);
          // console.log('farm', farms[i]);
          expect(item.user).to.equal(user.body._id);
          expect(item.name).to.equal(farms[i].name);
          expect(item.farmer).to.equal(farms[i].farmer);
        });
      } catch (err) {
        throw (err);
      }
    });

    it('filters farms by farmer', async () => {
      const farms = [
        DataFactory.farm({ farmer: 'Richard' }),
        DataFactory.farm({ farmer: 'James' }),
        DataFactory.farm({ farmer: 'Richard' }),
        DataFactory.farm({ farmer: 'James' }),
      ];

      const filteredFarms = farms.filter(farm => farm.farmer === 'Richard');

      try {
        await createMany(farms, token);
        const res = await chai.request(server)
          .get('/farms')
          .query({ farmer: 'Richard' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(filteredFarms.length);
        res.body.forEach(item => {
          expect(item.farmer).to.equal('Richard');
        });
      } catch (err) {
        throw (err);
      }
    });

    it('filters farms by name', async () => {
      const farms = [
        DataFactory.farm({ name: 'North Farm' }),
        DataFactory.farm({ name: 'North West Farm' }),
        DataFactory.farm({ name: 'West Farm' }),
        DataFactory.farm({ name: 'East Farm' }),
      ];

      const filteredFarms = farms.filter(farm => farm.name.includes('East'));

      try {
        await createMany(farms, token);
        const res = await chai.request(server)
          .get('/farms')
          .query({ name: 'East' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(filteredFarms.length);
        res.body.forEach(item => {
          expect(item.name).to.contain('East');
        });
      } catch (err) {
        throw (err);
      }
    });
  });
});
