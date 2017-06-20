const serveHome = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.file('./public/index.html');
  },
};

const servePublic = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: './public',
    },
  },
};

module.exports = [serveHome, servePublic];
