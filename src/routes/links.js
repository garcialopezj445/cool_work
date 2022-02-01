/*
const express = require('express');

const router = express.Router();

const pool = require('../database');

router.get('/add/:identificacion_usuario', async (req, res) => {
    const {identificacion_usuario} = req.params;
    console.log(identificacion_usuario);
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_usuario]);
    res.render('links/add', { user: prueba[0] });
});

router.post('/add/:identificacion_usuario', async (req, res) => {
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
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro guardado correctamente');
});

router.get('/edit/:identificacion_registro', async (req, res) => {
    const { identificacion_registro } = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    res.render('links/edit', { registrosUsuario: registrosUsuario[0] });
});

router.post('/edit/:identificacion_registro', async (req, res) => {
    const { identificacion_registro } = req.params;
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
    await pool.query('UPDATE servicio set ? WHERE identificacion_registro = ?', [newRegistro, identificacion_registro]);
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro actualizado correctamente');
});

router.get('/delete/:identificacion_registro', async (req, res) => {
    const { identificacion_registro } = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    console.log(registrosUsuario[0]);
    res.render('links/delete', { registrosUsuario: registrosUsuario[0] });
});

router.post('/delete/:identificacion_registro', async (req, res) => {
    const { identificacion_registro } = req.params;
    const {
        identificacion_servicio_usuario,
    } = req.body;
    const registro = {
        identificacion_servicio_usuario,
    }
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_servicio_usuario]);
    await pool.query('DELETE FROM servicio WHERE identificacion_registro = ?', [identificacion_registro]);
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro eliminado correctamente');
});

module.exports = router;
*/

const {Router} = require('express');
const router = Router();
const BD = require('../database');

router.get('/add/:identificacion_usuario', async (req, res) => {
    let prueba = []
    const {identificacion_usuario} = req.params;
    sql = "SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario";
    const result = await BD.Open(sql, [identificacion_usuario], false);
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
        prueba.push(usuarioSquema);
    });
    res.render('links/add', { user: prueba[0] });
});


router.post('/add/:identificacion_usuario', async (req, res) => {
    let prueba = [];
    const {
        identificacion_registro,
        nombre_servicio,
        identificacion_servicio_usuario,
        descripcion_servicio,
        codigo_servicio_categoria
    } = req.body;
    sql = "INSERT INTO servicio (identificacion_registro, nombre_servicio, identificacion_servicio_usuario, descripcion_servicio, codigo_servicio_categoria) VALUES (:identificacion_registro, :nombre_servicio, :identificacion_servicio_usuario, :descripcion_servicio, :codigo_servicio_categoria)";
    await BD.Open(sql, [identificacion_registro, nombre_servicio, identificacion_servicio_usuario, descripcion_servicio, codigo_servicio_categoria], true);

    sql = "SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario";
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
        prueba.push(usuarioSquema);
    });
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro actualizado correctamente');
});


router.get('/edit/:identificacion_registro', async (req, res) => {
    let registrosUsuario = [];
    const { identificacion_registro } = req.params;
    sql = "SELECT * FROM servicio WHERE identificacion_registro = :identificacion_registro";
    const result = await BD.Open(sql, [identificacion_registro], false);
    result.rows.map(service => {
        let serviceSquema = {
            'identificacion_registro' : service[0],
            'nombre_servicio' : service[1],
            'descripcion_servicio' : service[2],
            'identificacion_servicio_usuario' : service[3],
            'codigo_servicio_categoria' : service[4]
        }
        registrosUsuario.push(serviceSquema);
    });
    res.render('links/edit', { registrosUsuario: registrosUsuario[0] });
});

router.post('/edit/:identificacion_registro', async (req, res) => {
    let prueba = [];
    const { identificacion_registro } = req.params;
    const {
        nombre_servicio,
        identificacion_servicio_usuario,
        descripcion_servicio,
        codigo_servicio_categoria
    } = req.body;
    sql = "UPDATE servicio set nombre_servicio = :nombre_servicio, descripcion_servicio = :descripcion_servicio, codigo_servicio_categoria = :codigo_servicio_categoria WHERE identificacion_registro = :identificacion_registro";
    await BD.Open(sql, [nombre_servicio, descripcion_servicio, codigo_servicio_categoria, identificacion_registro], true);

    sql = "SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario";
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
        prueba.push(usuarioSquema);
    });
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro actualizado correctamente');
});

router.get('/delete/:identificacion_registro', async (req, res) => {
    let registrosUsuario = [];
    const { identificacion_registro } = req.params;
    sql = "SELECT * FROM servicio WHERE identificacion_registro = :identificacion_registro";
    const result = await BD.Open(sql, [identificacion_registro], false);
    result.rows.map(service => {
        let serviceSquema = {
            'identificacion_registro' : service[0],
            'nombre_servicio' : service[1],
            'descripcion_servicio' : service[2],
            'identificacion_servicio_usuario' : service[3],
            'codigo_servicio_categoria' : service[4]
        }
        registrosUsuario.push(serviceSquema);
    });
    console.log(registrosUsuario[0]);
    res.render('links/delete', { registrosUsuario: registrosUsuario[0] });
});

router.post('/delete/:identificacion_registro', async (req, res) => {
    let prueba = [];
    const { identificacion_registro } = req.params;
    const {identificacion_servicio_usuario} = req.body;
    sql = "SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario"
    const result = await BD.Open(sql, [identificacion_servicio_usuario], true);
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
        prueba.push(usuarioSquema);
    });

    sql = "DELETE FROM servicio WHERE identificacion_registro = :identificacion_registro";
    await BD.Open(sql, [identificacion_registro], true);
    res.render('profile', { user: prueba[0] });
    req.flash('realizado', 'Registro eliminado correctamente');
});

module.exports = router;
