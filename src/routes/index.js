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

router.get('/searchUser', async(req,res) =>{
    res.render('home/searchUsers');
});

module.exports = router;