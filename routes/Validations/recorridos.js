/**
 * Created by GMG on 06/04/2016.
 */
var joi=require('joi');

module.exports.getPuntos={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        imei:joi.number().positive().required(),
        desde:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/).required(),
        hasta:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/).required()
    }
}

module.exports.getRecorridosHora={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        imei:joi.array().required()
    }
}