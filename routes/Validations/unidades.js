/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.getAll={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required()
}

module.exports.Update={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        imei:joi.number().positive().required(),
        conductor:joi.number().positive().required(),
        vehiculo:joi.string().required(),
        icono:joi.number().positive().required()
    }
}

module.exports.post={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        conductor:joi.number().positive().required(),
        imei:joi.number().required(),
        modelo:joi.number().positive().required(),
        nombre:joi.string().required(),
        activo:joi.boolean().required(),
        icono:joi.number().positive().required(),
        fecha:joi.date().required()
    }
}

module.exports.delete={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required()
    }
}
