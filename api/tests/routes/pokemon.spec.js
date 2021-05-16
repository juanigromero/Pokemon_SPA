
var supertest = require('supertest-as-promised')(require('../../src/app.js'));
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

let newId = 1500

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create({
      id: newId++,
      name: 'Juan',
      hp:100,
      strength:50,
      defense:10,
      speed: 10,
      height: 14,
      weight: 20,
      img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/725.png'
    }))
    .catch((error)=>{
      console.log('aaa', error)
    })
    );

  describe('POST /pokemons', ()=>{
    it('debería responder con 200', ()=>{
      agent.post('/pokemons').expect(200)
    });
    it('devuelve el pokemon creado',()=>{
     agent.post('/pokemons')
      .send({
      name: 'pika',
      hp: 100,
      strength: 50,
      defense: 10,
      speed: 10,
      height: 14,
      weight: 20,
      tipos:[1,2]
      })
      .end( function(err,res){
        if(err) return console.error(err);
        expect(res.body.name).to.be.equal('pika');
        ;})

    })
  })

  describe('GET /pokemons', ()=>{
    it('deberia contestar con 200', () =>{
      agent.get('/pokemons')
      .expect(200)
    })
    it('deberia respoder con almenos 12 pokemons',()=>{
      agent.get('/pokemons')
      .expect(200)
      .expect((res) =>{
        expect(res.body.length).to.be.equal(40)
      })
    })
  })

  describe('GET /types', ()=>{
    it('deberia contestar con 200', () =>{
      agent.get('/types')
      .expect(200)
    })
    it('deberia respoder con 20 tipos',()=>{
      agent.get('/types')
      .expect(200)
      .expect((res) =>{
        expect(res.body.length).to.be.equal(20)
      })
    })
  })

});
