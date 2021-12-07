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
    console.log(newUsuario);
    req.flash('realizado', 'Registro guardado correctamente');
    res.send('enviado');
});

router.get('/login', async(req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const {identificacion_usuario} = req.body;
    const {clave} = req.body;
    const prueba = await pool.query('SELECT * FROM usuario WHERE identificacion_usuario = ? and password = ?', [identificacion_usuario, clave]);
    if(prueba.length > 0){
        req.flash('realizado', 'Sesión validada');
        //const user = prueba[0];
        res.render('profile', {user: prueba[0]});
        //res.json(prueba[0]);
        //res.render('linksUser'); pendiente
    }else{
        req.flash('incorrecto', 'Valores incorrectos');
        res.redirect('/login');
    }

});

/*
router.get('/profile', async (req, res) =>{
    const links = await pool.query('SELECT * FROM servicio');
    console.log(links);
    res.render('links/service', { links });
});

*/

router.get('/registros/:identificacion_usuario', async(req, res) => {
    const {identificacion_usuario} = req.params;
    console.log(identificacion_usuario);
    const registrosUsuario = await pool.query('SELECT * FROM servicio WHERE identificacion_servicio_usuario = ?', [identificacion_usuario]);
    console.log(registrosUsuario);
    res.render('links/service', { registrosUsuario });
});

module.exports = router;