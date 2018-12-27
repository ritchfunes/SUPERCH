/**
 * Created by GMG on 04/04/2016.
 */
var joi=require('joi');

module.exports.reset={
    options:{allowUnknownBody:false, flatten:true},
    user:joi.number().positive().required(),
    body:{
        pass:joi.string().required(),
        opass:joi.string().required()
    }
}