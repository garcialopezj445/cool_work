/*
const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res) => {
    const {
        identificacion_usuario, 
        nombre_usuario,
        password, 
        telefono_usuario,
        codigo_residencia_usuario,
        fecha_nacimiento_usuario,
        codigo_sexo_usuario
    } = req.body;
    const newUsuario = {
        identificacion_usuario, 
        nombre_usuario,
        password, 
        telefono_usuario,
        codigo_residencia_usuario,
        fecha_nacimiento_usuario,
        codigo_sexo_usuario
    };
    await pool.query('INSERT INTO usuario set ?', [newUsuario]);
    res.redirect('/login');
    req.flash('realizado', 'Registro guardado correctamente');
});

router.get('/login', async(req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const {identificacion_usuario} = req.body;
    const {clave} = req.body;
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ? and password = ?', [identificacion_usuario, clave]);
    if(prueba.length > 0){
        res.render('profile', {user: prueba[0]});
        req.flash('realizado', 'Sesión validada');
    }else{
        res.redirect('/login');
        req.flash('incorrecto', 'Valores incorrectos');
    }
});

router.get('/registros/:identificacion_usuario', async(req, res) => {
    const {identificacion_usuario} = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_servicio_usuario = ?', [identificacion_usuario]);
    res.render('links/service', { registrosUsuario });
});

router.get('/editUser/:identificacion_usuario', async(req, res) => {
    const {identificacion_usuario} = req.params;
    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_usuario]);
    console.log(usuario);
    res.render('editUser', { usuario: usuario[0] });
});

router.post('/editUser/:identificacion_usuario', async (req, res) => {
    const {identificacion_usuario} = req.params;
    const { 
        nombre_usuario,
        password, 
        telefono_usuario,
        codigo_residencia_usuario,
        fecha_nacimiento_usuario,
        codigo_sexo_usuario
    } = req.body;
    const usuario = {
        nombre_usuario,
        password, 
        telefono_usuario,
        codigo_residencia_usuario,
        fecha_nacimiento_usuario,
        codigo_sexo_usuario
    };
    await pool.query('UPDATE usuario set ? WHERE identificacion_usuario = ?', [usuario, identificacion_usuario]);
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_usuario]);
    res.render('profile', {user: prueba[0]});
    req.flash('realizado', 'Registro actualizado correctamente');
});

router.get('/volver/:identificacion_usuario', async (req, res) => {
    const {identificacion_usuario} = req.params;
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ?', [identificacion_usuario]);
    res.render('profile', {user: prueba[0]});
});

module.exports = router;
*/


const {Router} = require('express');
const router = Router();
const BD = require('../database');

router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', async (req, res) => {
    let usuario = [];
    const {
        identificacion_usuario, 
        nombre_usuario,
        telefono_usuario,
       // fecha_nacimiento_usuario,
        codigo_sexo_usuario, 
        codigo_residencia_usuario,
        password
    } = req.body;
    sql = "INSERT INTO usuario (identificacion_usuario, nombre_usuario, telefono_usuario, codigo_sexo_usuario, codigo_residencia_usuario, password) VALUES (:identificacion_usuario, :nombre_usuario, :telefono_usuario, :codigo_sexo_usuario, :codigo_residencia_usuario, :password)";
    await BD.Open(sql, [identificacion_usuario, nombre_usuario, telefono_usuario, codigo_sexo_usuario, codigo_residencia_usuario, password], true);
    res.redirect('/login');
    req.flash('realizado', 'Registro guardado correctamente');
});

router.get('/login', async(req, res) =>{
    res.render('auth/login')
});

router.post('/login', async(req,res) => {
    let usuario = [];
    const {identificacion_usuario} = req.body;
    const {clave} = req.body;
    sql = "SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario and password = :password";
    const result = await BD.Open(sql, [identificacion_usuario, clave], false);
    //console.log(result.rows[0][0]);
    if(result.rows[0][0] > 0){
        result.rows.map(usuarios => {
            let usuarioSquema = {
                "identificacion_usuario" : usuarios[0],
                "nombre_usuario" : usuarios[1],
                'telefono_usuario' : usuarios[2],
                //'fecha_nacimiento_usuario' : usuarios[3],
                'codigo_sexo_usuario' : usuarios[3],
                'codigo_residencia_usuario' : usuarios[4],
                'password' : usuarios[5], 
            }
            usuario.push(usuarioSquema);
        });
        res.render('profile', {user: usuario[0]});
    }else{
        res.redirect('/login');
        req.flash('incorrecto', 'Valores incorrectos');
    }
});

router.get('/registros/:identificacion_usuario', async(req, res) => {
    let registrosUsuario = [];
    const {identificacion_usuario} = req.params;
    sql = "SELECT * FROM servicio WHERE identificacion_servicio_usuario = :identificacion_servicio_usuario";
    const result = await BD.Open(sql, [identificacion_usuario], false);
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
    res.render('links/service', { registrosUsuario });
});

router.get('/editUser/:identificacion_usuario', async(req, res) => {
    let usuario = [];
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
        usuario.push(usuarioSquema);
    });
    res.render('editUser', { usuario: usuario[0] });
});

router.post('/editUser/:identificacion_usuario', async (req, res) => {
    let prueba = [];
    const {identificacion_usuario} = req.params;
    const { 
        nombre_usuario,
        telefono_usuario, 
       // fecha_nacimiento_usuario,
        codigo_sexo_usuario, 
        codigo_residencia_usuario,
        password
    } = req.body;
    sql = "UPDATE usuario SET nombre_usuario = :nombre_usuario, telefono_usuario = :telefono_usuario, codigo_sexo_usuario = :codigo_sexo_usuario, codigo_residencia_usuario = :codigo_residencia_usuario, password = :password WHERE identificacion_usuario = :identificacion_usuario";
    await BD.Open(sql, [nombre_usuario, telefono_usuario, codigo_sexo_usuario, codigo_residencia_usuario, password, identificacion_usuario], true);

    sql = 'SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario';
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
    res.render('profile', {user: prueba[0]});
    req.flash('realizado', 'Registro actualizado correctamente');
});

router.get('/volver/:identificacion_usuario', async (req, res) => {
    let prueba = [];
    const {identificacion_usuario} = req.params;
    sql = 'SELECT * FROM usuario WHERE identificacion_usuario = :identificacion_usuario';
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
    res.render('profile', {user: prueba[0]});
});

module.exports = router;
