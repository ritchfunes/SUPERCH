/**
 * Created by Walter Suazo on 15/01/2016.
 */

var express = require('express');
var privilegiosrolModel = require('../models/UnidadesEmpresas');

exports.get= function (req,res) {
  var rol = req.rol;
  privilegiosrolModel.get(rol,function(error,data){
    if(error){
      console.log(error);
      res.sendStatus(500);
    }else
    {
      res.send(data);
    }
  });
}


exports.post= function (req,res) {
  if(typeof req.body.empresa === "undefined" )
  {
    res.sendStatus(403);
  }
  if(typeof req.body.unidad === "undefined" )
  {
    res.sendStatus(403);
  }

  data= {
    FK_EmpresaId: req.body.empresa,
    FK_UnidadId:req.body.unidad
  }
  privilegiosrolModel.post(data,function(error,data)
  {
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }
  });
}


exports.delete= function (req,res) {

  id = req.body.id;
  privilegiosrolModel.delete(id,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }

  });
}



exports.put= function (req,res) {
  empresa = req.empresa;
  id = req.body.id;
  data = {}

  if(typeof req.body.accion=== "undefined"){}else
  {
    data['FK_AccionId']=req.body.accion;
  }
  if(typeof req.body.ruta=== "undefined"){}else
  {
    data['FK_RutaId']=req.body.ruta;
  }

  if(Object.keys(data).length<1 || !req.body.id) {
    res.sendStatus(400);

  }else
  {
    privilegiosrolModel.put(id,data,function(error,datos){
      if(error){
        console.log(error);
        res.sendStatus(500);
      }else
      {
        res.sendStatus(200);
      }
    });

  }

}
