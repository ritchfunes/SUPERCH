/**
 * Created by GMG on 06/04/2016.
 */
var joi=require('joi');

module.exports.get={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().integer().positive().required()
}

module.exports.post={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        filtro:joi.object().keys({
            nombre:joi.string().required(),
            correos:joi.string().required(),
            tipoVelocidad:joi.boolean().required(),
            tipoPermanencia:joi.boolean().required(),
            tipoEntrada:joi.boolean().required(),
            tipoSalida:joi.boolean().required(),
            d1:joi.boolean().required(),
            d2:joi.boolean().required(),
            d3:joi.boolean().required(),
            d4:joi.boolean().required(),
            d5:joi.boolean().required(),
            d6:joi.boolean().required(),
            d7:joi.boolean().required(),
            desde:joi.date().required(),
            hasta:joi.date().required(),
            frecuencia:joi.number().optional(),
            tiempo:joi.number().optional(),
            velocidadMax:joi.number().positive().optional(),
            velocidadMin:joi.number().min(0).optional(),
            descripcion:joi.string().allow("").optional()
        }).required(),
        unidades:joi.array().required(),
        geocercas:joi.array().required()
    }
};

module.exports.delete={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        id:joi.number().positive().required()
    }
}

module.exports.put={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        id:joi.number().positive().required(),
        nombre:joi.string().optional(),
        correos:joi.string().optional(),
        descripcion:joi.string().allow("").optional(),
        tipoVelocidad:joi.boolean().optional(),
        tipoPermanencia:joi.boolean().optional(),
        tipoEntrada:joi.boolean().optional(),
        tipoSalida:joi.boolean().optional(),
        d1:joi.boolean().optional(),
        d2:joi.boolean().optional(),
        d3:joi.boolean().optional(),
        d4:joi.boolean().optional(),
        d5:joi.boolean().optional(),
        d6:joi.boolean().optional(),
        d7:joi.boolean().optional(),
        desde:joi.date().optional(),
        hasta:joi.date().optional(),
        frecuencia:joi.number().optional(),
        tiempo:joi.number().optional(),
        velocidadMax:joi.number().positive().optional(),
        velocidadMin:joi.number().min(0).optional(),
        unidades:joi.array().optional(),
        geocercas:joi.array().optional()
    }
}