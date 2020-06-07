const addData = (farmId, data, token) => new Promise((resolve, reject) => {
  chai.request(server)
    .post(`/farms/${farmId}`)
    .set('Authorization', token)
    .send(data)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});

// const createMany = (farms, token) => Promise.all(farms.map(farm => create(farm, token)));

module.exports = { addData };
