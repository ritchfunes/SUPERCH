/**
 * Created by GMG on 07/04/2016.
 */
var joi=require('joi');

module.exports.post={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        descripcion:joi.string().required()
    }
}

module.exports.delete={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        id:joi.number().positive().required()
    }
}

module.exports.put={
    options:{allowUnknownBody:false, flatten:true},
    empresa:joi.number().positive().required(),
    body:{
        id:joi.number().positive().required(),
        descripcion:joi.string().optional()
    }
}