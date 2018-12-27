/**
 * Created by GMG on 08/04/2016.
 */
var joi=require('joi');

module.exports.crear={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        nombre:joi.string().required(),
        apellido:joi.string().required(),
        telefono:joi.string().required(),
        direccion:joi.string().required(),
        identidad:joi.string().required(),
        fechaExp:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).required(),
        ficha:joi.string().required(),
        codigo: joi.string().required(),
        estado: joi.number().min(0).required()
    }
}

module.exports.listar={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required()
}

module.exports.eliminar={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required()
    }
}

module.exports.actualizar={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required(),
        nombre:joi.string().optional(),
        apellido:joi.string().optional(),
        telefono:joi.string().optional(),
        direccion:joi.string().optional(),
        identidad:joi.string().optional(),
        fechaExp:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/).optional(),
        ficha:joi.string().optional(),
        empresa:joi.number().positive().optional(),
        codigo: joi.string().optional(),
        estado: joi.number().min(0).optional()
    }
}