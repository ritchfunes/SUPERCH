/**
 * Created by GMG on 07/04/2016.
 */
var joi=require('joi');

module.exports.listar={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required()
}

module.exports.guardar={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        unidades:joi.array().required(),
        evento:joi.number().positive().required(),
        nombre:joi.string().required(),
        correos:joi.string().required()
    }
}

module.exports.eliminar={
    options:{allowUnknownBody:false, flatten:true},
    body:{id:joi.number().positive().required()}
}

module.exports.modificar={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required(),
        nombre:joi.string().optional(),
        correos:joi.string().optional(),
        usuario:joi.number().positive().optional(),
        unidades:joi.array().optional()
    }
}