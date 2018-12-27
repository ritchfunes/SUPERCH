/**
 * Created by Walter Suazo on 28/10/2015.
 */

var express = require('express');
var moment = require('moment');
var bitacoraModel = require('../models/Bitacora');

exports.ultimaSesion=function(req,res,next){
    var userId = req.user;
    data = {
        IdUsuario:userId
    }
    bitacoraModel.UltimaSesion(data,function(error,dato)
    {
       if(error)
       {
           res.send({fecha:'no se cuando'});
       } else
       {
           //parsear la hora a devolver que viene en data
        if (dato.length > 0){

          res.send({fecha:(dato[1] != null ? dato[1].fecha: dato[0].fecha)});
        }else
        {
          res.send({fecha:moment().utc()})
        }
       }
    });
}

exports.ultimosEventos = function(req,res,next){
    var userId = req.user;
    data=
    {
        IdUsuario:userId
    }
    bitacoraModel.ultimosEventosUsuario(data,function(error,data)
    {
        if (error)
        {
            res.send({data:''})
        }else
        {
            res.send({data:data})
        }
    })
}

