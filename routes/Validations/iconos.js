/**
 * Created by GMG on 06/04/2016.
 */
var joi=require('joi');

module.exports.add={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        url:joi.string().required()
    }
}

module.exports.get={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        id:joi.number().positive().optional()
    }
}