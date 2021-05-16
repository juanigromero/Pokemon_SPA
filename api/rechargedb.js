const axios = require("axios");
const { Tipo } = require('./src/db.js');
const {urls} = require('./urls_types')

module.exports = {
  precharge: async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/type`);
      tipos = data.results;
      tipos.forEach(async (tipo) => {
          typesprite = urls?.find(u => u.name === tipo.name)
          let t = await Tipo.create({
            name: tipo.name,
            image: typesprite?.url,
          });
      });
  },
};
