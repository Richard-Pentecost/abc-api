const { signUp, login } = require('./helpers/user-helpers');
const { create, createMany } = require('./helpers/farm-helpers');
const { addData } = require('./helpers/data-helpers');
const DataFactory = require('./helpers/data-factory');
const Farm = require('../src/models/farm');
const Data = require('../src/models/data');

describe('/farms/:farmId', () => {
  const userData = DataFactory.user();
  const farmData = DataFactory.farm();
  let user;
  let token;
  let farm;

  beforeEach(async () => {
    user = await signUp(userData);
    const credentials = await login(userData.email, userData.password);
    token = credentials.body.token;
    farm = await create(farmData, token);
  });


  describe('POST /farms/:farmId', () => {
    it('creates a data input', async () => {
      try {
        const data = DataFactory.data();
        const farmId = farm.body._id;
        const res = await addData(farmId, data, token);
        expect(res.status).to.equal(201);

        const newData = await Data.findById(res.body._id);
        expect(JSON.stringify(newData.user)).to.equal(JSON.stringify(user.body._id));
        expect(JSON.stringify(newData.farm)).to.equal(JSON.stringify(farm.body._id));
        expect(newData.data.date).to.eql(data.date);
        expect(newData.data.product).to.equal(data.product);
        expect(newData.data.quantity).to.equal(data.quantity);
        expect(newData.data.meterReading).to.equal(data.meterReading);
        expect(newData.data.initialFloat).to.equal(data.initialFloat);
        expect(newData.data.waterUsage).to.equal(data.waterUsage);
        expect(newData.data.pumpDial).to.equal(data.pumpDial);
        expect(newData.data.float).to.equal(data.float);
        expect(newData.data.reading).to.equal(data.reading);
        expect(newData.data.comments).to.equal(data.comments);
        const count = await Data.countDocuments();
        expect(count).to.equal(1);
      } catch (err) {
        throw (err);
      }
    });

    xit('validates that a farm has a name', async () => {
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

    xit('farm listing will not be created if the user is not authorized', async () => {
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

    xit('filters farms by farmer', async () => {
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

    xit('filters farms by name', async () => {
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
