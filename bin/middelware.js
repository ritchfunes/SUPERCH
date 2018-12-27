/**
 * Created by Walter Suazo on 21/07/2015.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
    if(!req.headers.authorization) {
        console.log("Tu petici�n no tiene cabecera de autorizaci�n");
        return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
    }

    var token = req.headers.authorization.split(" ")[0];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    now = moment().unix();
    if(payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({message: "El token ha expirado"});
    }

    req.user = payload.sub;
    req.empresa = payload.emp;
    req.rol=payload.rol;
    req.socio=payload.socio;
    next();
}

exports.visitAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {

    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[0];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  now = moment().utc().unix();
    console.log(now);
  if(payload.ini >= moment().utc().unix()) {
    return res
      .status(401)
      .send({message: "El acceso aun no es Valido"});
  }
  if(payload.exp <= moment().utc().unix()) {
    return res
      .status(401)
      .send({message: "El token ha expirado"});
  }

  req.unidad = payload.unidad;
  req.empresa = payload.empresa;
  next();
}
