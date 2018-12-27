/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.todas={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required()
}

module.exports.guardar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        puntos:joi.string().regex(/^\(([-+]?[0-9]*\.?[0-9]*\s[-+]?[0-9]*\.?[0-9]*\,)+([-+]?[0-9]*\.?[0-9]*\s[-+]?[0-9]*\.?[0-9]*)\)/).required(),
        estado:joi.string().required(),
        nombre:joi.string().required(),
        color:joi.string().required(),
        descripcion:joi.string().allow("").optional()
    }
}

module.exports.modificar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        id:joi.number().positive().required(),
        puntos:joi.string().regex(/^\(([-+]?[0-9]*\.?[0-9]*\s[-+]?[0-9]*\.?[0-9]*\,)+([-+]?[0-9]*\.?[0-9]*\s[-+]?[0-9]*\.?[0-9]*)\)/).required(),
        estado:joi.string().required(),
        nombre:joi.string().required(),
        color:joi.string().required(),
        descripcion:joi.string().optional(),
        posiciones:joi.string().allow("").optional()
    }
}

module.exports.eliminar={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        id:joi.number().positive().required()
    }
}