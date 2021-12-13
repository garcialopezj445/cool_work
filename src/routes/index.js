const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    const services = await pool.query('SELECT * FROM servicio')
    res.render('home/index', {services: services});
    console.log(services);
});

module.exports = router;