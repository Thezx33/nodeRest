const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

const router = Router();


router.get( '/', usuariosGet );

router.put( '/:id', usuariosPut ); // Enviar un parámetro

router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength( { min: 6} ),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPost );

router.patch( '/', usuariosPatch );

router.delete( '/', usuariosDelete );


module.exports = router;