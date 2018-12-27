var express = require('express');
var moment = require('moment');
var servicio = require("../bin/servicios");
var userModel = require('../models/Users');
var bitacora = require('../models/Bitacora')
var privilegioModel = require('../models/PrivilegioRol')
var under = require('underscore')

var pmx = require('pmx');


exports.init=function(req,res){
    res.render('index', { title: 'Sabueso Track', Message:JSON.stringify('Inicie Session') });
}

exports.login=function(req,res){
    var user = req.body.username;
    var pass = servicio.encriptar(req.body.password);

    if ( user =="" ||  pass == "")
    {
        res.send('Debe proveer usuario y contraseña');
    }else{
        userModel.getUser(user,pass,function(error,data){
            if(error){
              res.send({msg:false})
            }

            if ((typeof data !== 'undefined') && (data.length>0 )) {
                datos = data[0]
                if (datos.Activo == 1) {
                    if (moment().isBefore(datos.Vigencia)) {
                        tokencito = servicio.createToken(data[0]);
                        var _rol = data[0].FK_RolesId;

                        var _view=data[0].View
                        var data = {
                            IdUsuario: data[0].PK_UsuariosId,
                            idEvento: 1,
                            Mensaje: "inicio sesion",
                            fecha: moment.utc().format()

                        };
                        bitacora.addUser(data, function (error, data) {});
                        privilegioModel.get(_rol,function(error,data){
                          if (data){
                            data= (under.groupBy(data,"Ruta"))
                          }else
                          {
                            data={}


                          }
                          pmx.emit('user:register', {
                            user : datos.Usuario
                          });
                          res.render(_view, {
                                            title: 'Super Sabueso',
                                            token: JSON.stringify(tokencito),
                                            rol:_rol,
                                            empresa:JSON.stringify(datos.Nombre),
                                            usuario:JSON.stringify(datos.Usuario),
                                            privilegios : JSON.stringify(data),
                                            logo:JSON.stringify(datos.Logo)

                                    });
                        });

                    }else
                    {
                        res.render('index',{title:'Super Sabueso',
                                            err:200,
                                            Message:JSON.stringify('Su usuario ha expirado')
                                    });
                    }
                }else
                {
                    res.render('index',{title:'Super Sabueso',err:200,Message:JSON.stringify('Se ha cancelado el acceso a su empresa')})
                }
            }
            else
            {
                res.render('index',{title:'Super Sabueso',err:200,Message:JSON.stringify('Usuario o Clave incorrecto')});
            }
        });
    }

}


exports.loginInvitado=function(req,res){
    var token = req.query.visit;
    var data = servicio.desencriptar(token);




    res.render('main', {
        title: 'Super Sabueso',
        token: JSON.stringify(token),
        rol:2,
        empresa:JSON.stringify(data.empresa),
        usuario:JSON.stringify(data.usuario),
        logo:JSON.stringify(data.logo)
    });

}

exports.login2=function(req,res){
  var user = req.body.username;
  var pass = servicio.encriptar(req.body.password);

  if ( user =="" ||  pass == "")
  {
    res.send('Debe proveer usuario y contrase�a');
  }else{
    userModel.getUser(user,pass,function(error,data){
      if(error){

      }else

      if (typeof data !== 'undefined' &&  data.length >0 ) {
        datos = data[0]
        console.log(datos);
        if (datos.Activo == 1) {
          if (moment().isBefore(datos.Vigencia)) {
            console.log(moment().isBefore(datos.Vigencia));
            tokencito = servicio.createToken(data[0]);
            var data = {
              IdUsuario: data[0].PK_UsuariosId,
              idEvento: 1,
              Mensaje: "inicio sesion",
              fecha: moment.utc().format(),
            };
            bitacora.addUser(data, function (error, data) {

            });
            res.send({status:200,token:tokencito,empresa:datos.Nombre,rol:datos.FK_RolesId });

          }else
          {
            res.send({status:401,Message:'Su usuario ha expirado'});
          }
        }else
        {
          res.send({status:401,Message:'Se ha cancelado el acceso a su empresa'});
        }
      }
      else
      {
        res.send({status:401,Message:'Usuario o Clave incorrecto'});

      }
    });
  }

}
