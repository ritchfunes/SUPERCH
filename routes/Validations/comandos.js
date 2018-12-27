/**
 * Created by GMG on 05/04/2016.
 */
var joi=require('joi');var joi=require('joi');

module.exports.posicion={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        imei:joi.number().positive().required(),
        vehiculo:joi.string().required()
    }
}

module.exports.llavines={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        imei:joi.number().positive().required(),
        vehiculo:joi.string().required()
    }
}

module.exports.apagar={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        imei:joi.number().positive().required(),
        vehiculo:joi.string().required()
    }
}

module.exports.habilitar={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        imei:joi.number().positive().required(),
        vehiculo:joi.string().required()
    }
}

module.exports.otro={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        imei:joi.number().positive().required(),
        vehiculo:joi.string().required(),
        comando:joi.string().required()
    }
}