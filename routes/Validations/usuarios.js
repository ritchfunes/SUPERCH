/**
 * Created by GMG on 08/04/2016.
 */
var joi=require('joi');

module.exports.getUsuarios={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        empresaId:joi.number().positive().required()
    }
}

module.exports.getAcceso={
    options:{allowUnknownBody:false, flatten:true},
    body:joi.object().required()
}

module.exports.getAccesoVisita={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        inicio:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/).required(),
        fin:joi.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/).required(),
        unidad:joi.number().positive().required(),
        empresa:joi.string().required(),
        correo:joi.string().required(),
        Invitado:joi.string().required()
    }
}

module.exports.invitado={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        t:joi.string().required()
    }
}