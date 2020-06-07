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

exports.login = (email, password) => new Promise((resolve, reject) => {
  chai.request(server)
    .post('/login')
    .send({ email, password })
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});
