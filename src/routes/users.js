const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/createUser', async (req, res) => {
    const {
        identificacionUsuario,
        contraseña,
        nombreUsuario,
        rolUniversidad
    } = req.body;

    const newUser = {
        identificacionUsuario,
        contraseña,
        nombreUsuario,
        rolUniversidad
    }

    await pool.query('INSERT INTO USUARIO SET ?', [newUser], (err, rows, fields) => {
        if(!err) {
            res.redirect('/login');
        } else {
            console.log(err);
        }
    });
});

router.get('/login', async(req, res) => {
    res.render('auth/login')
});

router.post('/loginUser', async (req, res) => {
    const {identificacionUsuario} = req.body;
    const {contraseña} = req.body;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ? and contraseña = ?', [identificacionUsuario, contraseña]);

    if(usuario.length > 0){
        res.render('profile', {user: usuario[0]});
    }else{
        res.redirect('/login');
    }
});

router.get('/threads/:identificacionUsuario', async(req, res) => {
    const {identificacionUsuario} = req.params;

    const hilosUsuario = await pool.query('SELECT * FROM hilo WHERE identificacionUsuario_hilo = ?', [identificacionUsuario]);

    res.render('links/service', { hilosUsuario });
});

router.get('/volver/:identificacionUsuario', async (req, res) => {
    const {identificacionUsuario} = req.params;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario]);

    res.render('profile', {user: usuario[0]});
});

router.get('/editUser/:identificacionUsuario', async(req, res) => {
    const {identificacionUsuario} = req.params;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario]);
    
    res.render('editUser', { usuario: usuario[0] });
});

router.post('/updateUser/:identificacionUsuario', async (req, res) => {
    const {
        contraseña,
        nombreUsuario,
        rolUniversidad
    } = req.body;
 
    const usuario = {
        contraseña,
        nombreUsuario,
        rolUniversidad
    }

    const {
        identificacionUsuario 
    } = req.params;
    
    const user = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario]);
    
    await pool.query('UPDATE USUARIO SET ? WHERE IDENTIFICACIONUSUARIO = ?', [usuario, identificacionUsuario], (err, rows, fields) => {
        if(!err) {
            res.render('profile', {user: user[0]});
        } else { 
            console.log(err);
        }
    });
})

module.exports = router;
