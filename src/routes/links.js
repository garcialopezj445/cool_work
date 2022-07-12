
const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/delete/:identificacionHilo', async (req, res) => {
    const { identificacionHilo } = req.params;
    const hilosUsuario = await pool.query('SELECT * FROM hilo WHERE identificacionHilo = ?', [identificacionHilo]);
    res.render('links/delete', { hilosUsuario: hilosUsuario[0] });
});

router.post('/delete/:identificacionHilo', async (req, res) => {
    const { 
        identificacionHilo 
    } = req.params;

    const { 
        identificacionUsuario_hilo
    } = req.body;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario_hilo]);
    await pool.query('DELETE FROM HILO WHERE IDENTIFICACIONHILO = ?', [identificacionHilo], (err, rows, fields) => {
        if(!err) {
            res.render('profile', { user: usuario[0] });
        } else { 
            console.log(err);
        }
    })
    
});

router.get('/edit/:identificacionHilo', async (req, res) => {
    const { identificacionHilo} = req.params;
    const registrosUsuario = await pool.query('SELECT * FROM hilo WHERE identificacionHilo = ?', [identificacionHilo]);
    res.render('links/edit', { registrosUsuario: registrosUsuario[0] });
}); 

router.post('/updateThread/:identificacionHilo', async (req, res) => {
    const {
        descripcionHilo,
        referencasBibliograficas,
        identificacionUsuario_hilo
    } = req.body;
 
    const hilo = {
        descripcionHilo,
        referencasBibliograficas,
        identificacionUsuario_hilo
    }

    const {
        identificacionHilo
    } = req.params;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario_hilo]);

    await pool.query('UPDATE HILO SET ? WHERE IDENTIFICACIONHILO = ?', [hilo, identificacionHilo], (err, rows, fields) => {
        if(!err) {
            res.render('profile', { user: usuario[0] });
        } else { 
            console.log(err);
        }
    });
});

router.get('/add/:identificacionUsuario', async (req, res) => {
    const {identificacionUsuario} = req.params;

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario]);

    res.render('links/add', { user: usuario[0] });
});

router.post('/createThread/:identificacionUsuario', async (req, res) => {
    const {
        identificacionHilo,
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    } = req.body;

    const newThread = {
        identificacionHilo,
        descripcionHilo,
        referencasBibliograficas,
        codigoSO_hilo,
        identificacionUsuario_hilo
    }

    const usuario = await pool.query('SELECT * FROM usuario WHERE identificacionUsuario = ?', [identificacionUsuario_hilo]);

    await pool.query('INSERT INTO HILO SET ?', [newThread], (err, rows, fields) => {
        if(!err) {
            res.render('profile', { user: usuario[0] });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;

