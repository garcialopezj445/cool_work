
const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    const services = await pool.query('SELECT * FROM servicio')
    console.log(services);
    res.render('home/index', {services: services});
});

router.get('/viewUser/:identificacion_servicio_usuario', async(req, res) => {
    const {identificacion_servicio_usuario} = req.params;
    console.log(identificacion_servicio_usuario);
    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    res.render('home/viewUser', { usuario: usuario[0] });
});

router.get('/searchService', async(req,res) =>{
    res.render('home/searchService');
});

router.post('/buscarServicio', async(req, res) =>{
    const { codigo_servicio_categoria } = req.body;
    console.log(codigo_servicio_categoria);
    const servicio = await pool.query('SELECT * FROM servicio WHERE codigo_servicio_categoria = ?', [codigo_servicio_categoria]);
    res.render('home/viewServices', {servicio: servicio});
    console.log(servicio);
});

module.exports = router;


/*
const {Router} = require('express');
const router = Router();
const BD = require('../database');
const oracledb = require('oracledb');

const db = {
         user: 'system',
         password: 'jhonsito00',
         connectString: 'localhost:1521'
     }


// bien

/*router.get('/', async (req, res) => {
    
    sql = 'SELECT * FROM sexo_de_usuario';
    let sexo = await BD.Open(sql,{},false);
    let a = sexo;
    console.log(sexo.rows);
    //res.json(sexo.rows);
    res.send(a);
});

/*
router.get('/added-links', async (req, res) => {
    const sql = 'SELECT * FROM servicio';
    const resultado = oracledb.getConnection(db, function (err, connection) {
        if (err) console.log('ERROR');
        connection.execute(
          sql,
          {},
          {
            outFormat: oracledb.OBJECT // Return the result as Object
          },
          function (err, result) {
            if (err) console.log('error');
            else res.render('home/index', {services: result});
          }
        )
      });
    //const registrosUsuario = await BD.Open(sql,{}, false);
    console.log(resultado);
    //res.json(links);
    //res.render('links/service',  resultado );
});

router.get('/', async (req, res) => {
    sql = 'SELECT * FROM servicio';
    const result = await BD.Open(sql,{},false);
    console.log(result.metaData[1]);
    console.log(result.rows[1][0]);
    res.render('home/index', {services: result});
});

router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

module.exports = router;
*/