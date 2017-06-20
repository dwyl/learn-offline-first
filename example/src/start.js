const server = require('./server');

server.start(err => {
  if (err) throw err;

  console.log(`Server started on port ${server.info.uri}`);
});
