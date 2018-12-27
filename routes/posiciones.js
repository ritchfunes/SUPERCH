/**
 * Created by Walter Suazo on 12/08/2015.
 */

var express = require('express');
var posicionesModel = require('../models/Posiciones');
var geocode = require('../models/ReverseGeocoding');
var moment = require('moment');
var servicio = require("../bin/servicios");
moment.locale('es');

exports.listar=function(req,res){
    if (req.headers.imei == 'undefined')
    {
        res.send('error');

        return;
    }
    else{
        var data= req.headers.imei ||req.query.imei ;
    }

    posicionesModel.getLastPosiciones(data,20,function(error,data){
        if (error)
        {
            res.send('error');
        }
        else
        if (typeof data !== 'undefined' &&  data.length >0 )
        {

            res.send({
                title : "Listado Posiciones",
                info : data
            });

        }
    });

}

exports.listado=function(req,res){
  var unidad = req.unidad;

  posicionesModel.getListado(unidad,function(error,data){
    if (error)
    {
      res.send({msg:false});
    }
    else
    {

      res.send({
        title : "Listado Posiciones",
        info : data,
        cantidad:data.length
      });

    }
  });

}

exports.Posicion=function(req,res){
  //var data = req.headers.authorization.split(" ")[0];
  //console.log("--->");
  //console.log(data);
  //unidad = servicio.desencriptar(data).unidad;
  var unidad = req.unidad;
  posicionesModel.getPosicion(unidad,function(error,data){
    if (error)
    {
      res.send({msg:false});
    }
    else
    {

      res.send({
        msg : true,
        info : data
      });

    }
  });

}
