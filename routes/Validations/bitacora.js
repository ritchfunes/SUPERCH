/**
 * Created by GMG on 05/04/2016.
 */
var joi=require('joi');

module.exports.ultimaSesion={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required()
}

module.exports.ultimosEventos={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required()
}