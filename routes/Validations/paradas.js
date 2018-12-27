/**
 * Created by GMG on 08/06/2016.
 */
var joi=require('joi');

module.exports.crearParada={
    options:{allowUnknownBody:false, flatten:true},
    body: joi.array().items(joi.object().keys({
        referencias: joi.number().positive().required(),
        radio: joi.number().positive().required()
    }).required()).required()
};

module.exports.putParada={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id: joi.number().positive().required(),
        referencias: joi.number().positive().required(),
        radio: joi.number().positive().required()
    }
};

module.exports.getParadas={
    options:{allowUnknownBody:false, flatten:true},
    empresa: joi.number().positive().required()
};

module.exports.deleteParada={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        id: joi.number().positive().required()
    }
};

module.exports.getNoAutorizadas={
    options:{allowUnknownBody:false, flatten:true},
    empresa: joi.number().positive().required()
};