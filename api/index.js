
const axios = require("axios");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const {precharge} = require('./rechargedb.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async() => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    precharge()
      });
});
