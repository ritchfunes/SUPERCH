/**
 * Created by GMG on 06/04/2016.
 */
var joi=require('joi');

module.exports.getEvento={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        imei:joi.number().positive().required(),
        evento:joi.number().positive().required(),
        fecha:joi.date().required(),
        fechafin:joi.date().required()
    }
}

module.exports.getAllEventos={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    query:{
        fecha:joi.date().optional(),
        fechafin:joi.date().optional()
    }
}