/**
 * Created by GMG on 20/04/2016.
 */
var joi=require('joi');

module.exports.getRepAcceso={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().integer().positive().required()
}

module.exports.getRepAccFecha={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().integer().positive().required(),
    query:{
        fechainicio:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/).required(),
        fechafin:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/).required()
    }
}