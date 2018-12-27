/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.guardar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        nombre:joi.string().required(),
        descripcion:joi.string().allow("").optional(),
        latitud:joi.number().required(),
        longitud:joi.number().required(),
        iconoId:joi.number().positive().required(),
        visible:joi.number().min(0).max(1).required(),
        categoriaId:joi.number().positive().required()
    }
}

module.exports.listar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required()
}

module.exports.eliminar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    query:{
        id:joi.number().positive().required()
    }
}