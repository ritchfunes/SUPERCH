/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.init={
    options:{allowUnknownBody:false, flatten:true},
    query:{
        lat:joi.number().required(),
        lon:joi.number().required()
    },
    empresa:joi.number().positive().required()
}