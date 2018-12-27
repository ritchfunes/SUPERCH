/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.listar={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        imei:joi.number().positive().required()
    }
}

module.exports.listado={
    options:{allowUnknownBody:false, flatten:true},
    unidad:joi.number().positive().required()
}

module.exports.Posicion={
    options:{allowUnknownBody:false, flatten:true},
    unidad:joi.number().positive().required()
}