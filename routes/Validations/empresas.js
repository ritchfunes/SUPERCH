/**
 * Created by GMG on 07/04/2016.
 */
var joi=require('joi');

module.exports.post={
    options:{allowUnknownBody:false, flatten:true},
    socio:joi.number().positive().required(),
    body:{
        nombre:joi.string().required(),
        descripcion:joi.string().required()
    }
}

module.exports.get={
    options:{allowUnknownBody:false, flatten:true},
    socio:joi.number().positive().required()
}

module.exports.delete={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required()
    }
}

module.exports.put={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        id:joi.number().positive().required(),
        nombre:joi.string().optional(),
        descripcion:joi.string().optional(),
        activo:joi.number().min(0).max(1).optional()
    }
}