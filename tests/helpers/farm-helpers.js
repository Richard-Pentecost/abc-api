const create = (farm, token) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/farms')
    .set('Authorization', token)
    .send(farm)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

const createMany = (farms, token) => Promise.all(farms.map(farm => create(farm, token)));

module.exports = { create, createMany };
