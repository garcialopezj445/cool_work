/*
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
    console.log(usuario);
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
*/

const {Router} = require('express');
const router = Router();
const BD = require('../database');

router.get('/', async(req, res) => {
    let services = [];
    sql = 'SELECT * FROM servicio';
    const result = await BD.Open(sql, {}, false);
    result.rows.map(service => {
        let serviceSquema = {
            'identificacion_registro' : service[0],
            'nombre_servicio' : service[1],
            'descripcion_servicio' : service[2],
            'identificacion_servicio_usuario' : service[3],
            'codigo_servicio_categoria' : service[4]
        }
        services.push(serviceSquema);
    });
    res.render('home/index', {services: services});
});

router.get('/viewUser/:identificacion_servicio_usuario', async (req,res) => {
    let usuario = [];
    const {identificacion_servicio_usuario} = req.params;
    sql = 'SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario';
    const result = await BD.Open(sql, [identificacion_servicio_usuario], false);
    result.rows.map(usuarios => {
        let usuarioSquema = {
            "identificacion_usuario" : usuarios[0],
            "nombre_usuario" : usuarios[1],
            'telefono_usuario' : usuarios[2],
            //'fecha_nacimiento_usuario' : usuarios[3],
            'codigo_sexo_usuario' : usuarios[3],
            'codigo_residencia_usuario' : usuarios[4],
            'password' : usuarios[5]
        }
        usuario.push(usuarioSquema);
    });
    res.render('home/viewUser', {usuario: usuario[0]});
});

router.get('/searchService', async(req,res) =>{
    res.render('home/searchService');
}); 

router.post('/buscarServicio', async(req, res) =>{
    let services = [];
    const { codigo_servicio_categoria } = req.body;
    console.log(codigo_servicio_categoria);
    sql = "SELECT * FROM servicio WHERE codigo_servicio_categoria = :codigo_servicio_categoria";
    const result = await BD.Open(sql, [codigo_servicio_categoria], false);
    result.rows.map(service => {
        let serviceSquema = {
            'identificacion_registro' : service[0],
            'nombre_servicio' : service[1],
            'descripcion_servicio' : service[2],
            'identificacion_servicio_usuario' : service[3],
            'codigo_servicio_categoria' : service[4]
        }
        services.push(serviceSquema);
    });
    res.render('home/viewServices', {servicio: services});
});

module.exports = router;
