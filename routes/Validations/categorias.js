/**
 * Created by GMG on 06/04/2016.
 */
var joi=require('joi');

module.exports.guardar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        categoria:joi.string().required(),
        descripcion:joi.string().required()
    }
}

module.exports.listar= {
    options: {allowUnknownBody: false, flatten: true},
    empresa: joi.number().positive().required()
}

module.exports.eliminar={
    options: {allowUnknownBody: false, flatten: true},
    body:{
        id:joi.number().positive().required()
    }
}

module.exports.modificar={
    options: {allowUnknownBody: false, flatten: true},
    empresa: joi.number().positive().required(),
    body:{
        id:joi.number().positive().required(),
        descripcion:joi.string().optional(),
        categoria:joi.string().optional()
    }
}