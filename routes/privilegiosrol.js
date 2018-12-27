/**
 * Created by Walter Suazo on 08/01/2016.
 */
var express = require('express');
var privilegiosrolModel = require('../models/PrivilegioRol');
var under = require('underscore')

exports.fget = function (rol)
{
  privilegiosrolModel.get(rol,function(error,data){
    if(error){
      console.log(error);
      return({msg:false});
    }else
    {

      data= (under.groupBy(data,"Ruta"))

      return(data);
    }
  });
}

exports.get= function (req,res) {
  var rol = req.rol;
  privilegiosrolModel.get(rol,function(error,data){
    if(error){
      console.log(error);
      res.send({msg:false});
    }else
    {

      data= (under.groupBy(data,"Ruta"))

      res.send(data);
    }
  });
}



exports.post= function (req,res) {
  data= {
    FK_AccionId: req.body.accion,
    FK_RutaId:req.body.ruta
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
