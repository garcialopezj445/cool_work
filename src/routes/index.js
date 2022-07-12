
const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    const services = await pool.query('SELECT * FROM hilo');
    res.render('home/index', {services: services});
});

router.get('/viewUser/:identificacionUsuario_hilo', async(req, res) => {
    const {identificacionUsuario_hilo} = req.params;
    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario_hilo]);
    res.render('home/viewUser', { usuario: usuario[0] });
});

router.get('/searchUser', async(req,res) =>{
    res.render('home/searchUser');
});

router.post('/searchUser', async(req, res) =>{
    const { rolUniversidad } = req.body;
    const usuario = await pool.query('SELECT * FROM usuario WHERE rolUniversidad = ?', [rolUniversidad]);
    res.render('home/viewUsers', {usuario: usuario});
});

router.get('/buscarHilos/:identificacionUsuario', async(req, res) =>{
    const { identificacionUsuario } = req.params;
    const hilos = await pool.query('SELECT * FROM hilo WHERE identificacionUsuario_hilo = ?', [identificacionUsuario]);
    res.render('home/viewHilos', {hilos: hilos});
});

router.get('/searchHilos', async(req,res) =>{
    res.render('home/searchHilos');
});

router.post('/searchHilos', async(req, res) =>{
    const { codigoSO_hilo } = req.body;
    const hilo = await pool.query('SELECT * FROM hilo WHERE codigoSO_hilo = ?', [codigoSO_hilo]);
    res.render('home/verHilos', {hilo: hilo});
});
 
/*

router.get('/viewUser/:identificacion_servicio_usuario', async(req, res) => {
    const {identificacion_servicio_usuario} = req.params;
    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    res.render('home/viewUser', { usuario: usuario[0] });
});

router.get('/searchService', async(req,res) =>{
    res.render('home/searchService');
});

router.post('/buscarServicio', async(req, res) =>{
    const { codigo_servicio_categoria } = req.body;
    const servicio = await pool.query('SELECT * FROM servicio WHERE codigo_servicio_categoria = ?', [codigo_servicio_categoria]);
    res.render('home/viewServices', {servicio: servicio});
});

*/


module.exports = router;

