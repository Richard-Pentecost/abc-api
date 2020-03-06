exports.signUp = user => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/users')
    .send(user)
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
