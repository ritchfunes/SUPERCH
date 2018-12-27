/**
 * Created by GMG on 01/04/2016.
 */
var joi=require('joi');

module.exports={
    options:{allowUnknownBody:false, flatten:true},
    body:{
        username:joi.string().email({"minDomainAtoms":2}).required(),
        password:joi.string().required()
    }
}