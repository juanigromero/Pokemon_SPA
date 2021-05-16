const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { types } = require("pg");
// const { Sequelize } = require("sequelize/types");
const { Pokemon, Tipo } = require("../db.js");
const axios = require("axios");
const { urls } = require("../../urls_types.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// let newData = [];

let newData = [];
let newId = 1000;
router
  .route("/pokemons")
  .get(async (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const detail = {
          id: data.id,
          name: data.name,
          img:data.sprites.front_default,
          tipos: data.types.map((t) => {
                typesprite = urls?.find((u) => u.name === t.type.name);
                return { name: t.type.name, image: typesprite?.url };
              }),
        };
        res.json(detail);
      } catch (error) {
        const pokemonFound = await  Pokemon.findOne({
          where: {name},
          include: [
            {
              model: Tipo,
              as:'tipos',
              attributes: ["name","image"],
              through: { attributes: [] }
            },
          ],
        });
        if(!pokemonFound) return res.send('Lo sentimos, no pudimos encontrar ese Pokemon')
        else return res.json(pokemonFound)
      }
    } else {
      if (newData?.length < 40) {
        for (let i = 1; i < 41; i++) {
          try {
            let poke = axios.get(
              `https://pokeapi.co/api/v2/pokemon/${i}`
            );
 
            newData.push(poke);
          } catch (error) {
            console.log(error)
          }        
        }
      }
      res.json((await Promise.all(newData)).map(({data})=>{
        const poke = {
              id: data.id,
              name: data.name,
              img: data.sprites.front_default,
              strength: data.stats[1].base_stat,
              tipos: data.types.map((t) => {
                typesprite = urls?.find((u) => u.name === t.type.name);
                return { name: t.type.name, image: typesprite?.url };
              }),
            };
            return poke
      }));
    }
  })
  .post(async (req, res) => {
    const { name, hp, strength, defense, speed, height, weight, tipo1, tipo2 } = req.body;
    const tipos = [parseInt(tipo1),parseInt(tipo2)]
    console.log(tipos)
    const newPokemon = await Pokemon.create({
      id: newId++,
      name,
      hp: hp || 100,
      strength: strength || 50,
      defense:defense|| 10,
      speed: speed || 10,
      height: height || 14,
      weight: weight || 20,
      img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/725.png'
    });
    try{
      newPokemon.setTipos(tipos)
    }catch(error){
      console.log(error)
    }
    // console.log(newId)
    res.status(200).json(newPokemon);
  });

  
  router
    .route("/pokemonsCreated")
    .get(async(req,res)=> {
      const pokeCreated = await Pokemon.findAll({
        include: [
          {
            model: Tipo,
            as:'tipos',
            attributes: ["name","image"],
            through: { attributes: [] }
          },
        ]
      })
      res.json(pokeCreated)
    })

router.route("/pokemons/:idPokemon").get(async (req, res) => {
  const id = Number(req.params.idPokemon);
  if (isNaN(id)) {
    return res.send("El id ingresado es incorrecto, solo se admiten números");
  }
    console.log(id);
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      console.log(data)
      const detail = {
        id: data.id,
        name: data.name,
        hp: data.stats[0].base_stat,
        imge:
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        strength: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        weight: data.weight,
        height: data.height,
        tipos: data.types.map((t) => {
          typesprite = urls?.find((u) => u.name === t.type.name);
          return { name: t.type.name, image: typesprite?.url };
        }),
      };
      console.log(detail);
      res.json(detail);
    } catch (error) {
        const pokemon = await Pokemon.findOne({
          where: { id },
          include: [
            {
              model: Tipo,
              as:'tipos',
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
        });
        if(!pokemon)return res.send('Not Found')
        res.json(pokemon);
  }
});

router.route("/types").get(async (req, res) => {
  const Types = await Tipo.findAll({
    order: [["id", "ASC"]],
    include: [
      {
        model: Pokemon,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(Types);
});

module.exports = router;
