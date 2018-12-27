/**
 * Created by Walter Suazo on 07/01/2016.
 */
var express = require('express');
var privilegiosModel = require('../models/Privilegios');

exports.get= function (req,res) {
  privilegiosModel.get(function(error,data){
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
  data= {
    FK_RolesId: req.body.rol,
    FK_PrivilegiosId:req.body.privilegio
  }
  privilegiosModel.post(data,function(error,data)
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
  privilegiosModel.delete(id,function(error,data){
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
    privilegiosModel.put(id,data,function(error,datos){
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
