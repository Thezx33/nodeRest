const { request,response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = ( req = request, res = response ) => {

    const { query, nombre, apikey, page='1', limit } = req.query; // Obtener parámetros de query ( consulta )

    res.json({
        msg: 'get API - controller',
        query,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = async ( req = request, res = response ) => {
    


    // Obtener datos de una petición
    // const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save(); // Guardar en la base de datos.

    res.json({
        msg: 'post API - controller',
        usuario
    });
}

const usuariosPut = ( req = request, res = response ) => {
    
    const id = req.params.id; // Recibir el parámetro

    res.json({
        msg: 'put API - controller',
        id
    });
}

const usuariosPatch = ( req, res = response ) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usuariosDelete = ( req, res = response ) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};