/**
 * Created by Walter Suazo on 21/07/2015.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(data) {
    var payload = {
        iat: moment().unix(),
        exp: moment().add(12, "hours").unix(),
        emp:data.FK_EmpresasId,
        sub: data.PK_UsuariosId,
        rol:data.FK_RolesId,
        socio:data.FK_SocioId
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.createTokenvisita = function(data) {
  var payload = {
    ini: moment(data.ini).unix(),
    exp: moment(data.fin).unix(),
    unidad:data.unidad,
    empresa: data.empresa


  };

  return jwt.encode(payload, config.TOKEN_SECRET);
};


exports.createTokentemporal = function(data) {
    var payload = {
        iat: moment().unix(),
        exp: moment().add(1, "hours").unix(),
        emp:data.EmpresasId,
        sub: data.UsuariosId,
        rol:data.RolesId,
        socio:data.SocioId,
        empresa:data.Empresa,
        usuario:data.Usuario,
        logo:data.logo
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.encriptar=function(data)
{
    return jwt.encode(data,config.TOKEN_SECRET);
}

exports.desencriptar=function(data)
{
    return jwt.decode(data,config.TOKEN_SECRET);
}
