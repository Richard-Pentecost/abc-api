exports.create = (farm, token) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/farms')
    .set('Authorizaion', token)
    .send(farm)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
