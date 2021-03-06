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
        expect(newFarm.farmName).to.equal(farm.farmName);
        expect(newFarm.postcode).to.equal(farm.postcode);
        expect(newFarm.contactName).to.equal(farm.contactName);
        expect(newFarm.contactNumber).to.equal(farm.contactNumber);

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
          postcode: 'CW58HQ',
          contactName: 'Richard',
          contactNumber: '012345678',
        };

        const res = await create(farm, token);
        expect(res.status).to.equal(400);
        expect(res.body.errors.farmName).to.equal('A farm name must be provided');

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
    xit('retrieves a list of farms', async () => {
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
          expect(item.user).to.equal(user.body._id);
          expect(item.farmName).to.equal(farms[i].farmName);
          expect(item.postcode).to.equal(farms[i].postcode);
          expect(item.contactName).to.equal(farms[i].contactName);
          expect(item.contactNumber).to.equal(farms[i].contactNumber);
        });
      } catch (err) {
        throw (err);
      }
    });

    it('filters farms by farmer', async () => {
      const farms = [
        DataFactory.farm({ contactName: 'Richard' }),
        DataFactory.farm({ contactName: 'James' }),
        DataFactory.farm({ contactName: 'Richard' }),
        DataFactory.farm({ contactName: 'James' }),
      ];

      const filteredFarms = farms.filter(farm => farm.contactName === 'Richard');

      try {
        await createMany(farms, token);
        const res = await chai.request(server)
          .get('/farms')
          .query({ contactName: 'Richard' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(filteredFarms.length);
        res.body.forEach(item => {
          expect(item.contactName).to.equal('Richard');
        });
      } catch (err) {
        throw (err);
      }
    });

    it('filters farms by name', async () => {
      const farms = [
        DataFactory.farm({ farmName: 'North Farm' }),
        DataFactory.farm({ farmName: 'North West Farm' }),
        DataFactory.farm({ farmName: 'West Farm' }),
        DataFactory.farm({ farmName: 'East Farm' }),
      ];

      const filteredFarms = farms.filter(farm => farm.farmName.includes('East'));

      try {
        await createMany(farms, token);
        const res = await chai.request(server)
          .get('/farms')
          .query({ farmName: 'East' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(filteredFarms.length);
        res.body.forEach(item => {
          expect(item.farmName).to.contain('East');
        });
      } catch (err) {
        throw (err);
      }
    });
  });
});
