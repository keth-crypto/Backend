require('reflect-metadata');

const { createApp } = require('../dist/create-app');

let serverPromise;

async function getServer() {
  if (!serverPromise) {
    serverPromise = createApp()
      .then(async (app) => {
        await app.init();
        return app.getHttpAdapter().getInstance();
      })
      .catch((error) => {
        serverPromise = undefined;
        throw error;
      });
  }

  return serverPromise;
}

module.exports = async function handler(req, res) {
  const server = await getServer();
  server(req, res);
};
