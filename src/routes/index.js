const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    const services = await pool.query('SELECT * FROM servicio')
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

router.get('/', async (req, res) => {
    
    sql = 'SELECT * FROM sexo_de_usuario';
    let sexo = await BD.Open(sql,[],false);
    console.log(sexo.rows);
    res.json(sexo.rows);
});

module.exports = router;
*/