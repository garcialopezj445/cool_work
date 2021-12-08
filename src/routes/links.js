const express = require('express');

const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.render('links/homeUser');
});

router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', async (req, res) =>{
    const {
        nombre_servicio, 
        identificacion_servicio_usuario,
        descripcion_servicio, 
        codigo_servicio_categoria
    } = req.body;
    const newRegistro = {
        nombre_servicio, 
        identificacion_servicio_usuario,
        descripcion_servicio, 
        codigo_servicio_categoria
    };
    console.log(newRegistro);
    await pool.query('INSERT INTO servicio set ?', [newRegistro]);
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    req.flash('realizado', 'Registro guardado correctamente');
    res.render('profile', {user: prueba[0]});
});


router.get('/added-links', async (req, res) =>{
   const links = await pool.query('SELECT * FROM servicio');
    console.log(links);
    res.render('links/service', { links });
});

router.get('/edit/:identificacion_registro', async (req, res) =>{
    const {identificacion_registro} = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    console.log(registrosUsuario[0]);
    res.render('links/edit', { registrosUsuario: registrosUsuario[0] });
});

router.post('/edit/:identificacion_registro', async (req, res) => {
    const {identificacion_registro} = req.params;
    const {
        nombre_servicio, 
        identificacion_servicio_usuario,
        descripcion_servicio, 
        codigo_servicio_categoria
    } = req.body;
    const newRegistro = {
        nombre_servicio, 
        identificacion_servicio_usuario,
        descripcion_servicio, 
        codigo_servicio_categoria
    }
    console.log(newRegistro);
    await pool.query('UPDATE servicio set ? WHERE identificacion_registro = ?', [newRegistro, identificacion_registro]);
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    console.log(prueba);
    req.flash('realizado', 'Registro actualizado correctamente');
    res.render('profile', {user: prueba[0]});
});

router.get('/delete/:identificacion_registro', async (req, res) => {
    const {identificacion_registro} = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    console.log(registrosUsuario[0]);
    res.render('links/delete', { registrosUsuario: registrosUsuario[0] });  
});

router.post('/delete/:identificacion_registro', async (req, res) => {
    const {identificacion_registro} = req.params;
    const {
        identificacion_servicio_usuario,
    } = req.body;
    const registro = { 
        identificacion_servicio_usuario,
    }
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    console.log(prueba);
    await pool.query('DELETE FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    req.flash('realizado', 'Registro eliminado correctamente');
    res.render('profile', {user: prueba[0]});
});


module.exports = router;