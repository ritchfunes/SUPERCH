/**
 * Created by Walter Suazo on 07/01/2016.
 */
var express = require('express');
var rolesModel = require('../models/Roles');

exports.get= function (req,res) {
  rolesModel.get(function(error,data){
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
    Descripcion: req.body.descripcion,
  }
  rolesModel.post(data,function(error,data)
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
  rolesModel.delete(id,function(error,data){
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

  if(typeof req.body.descripcion=== "undefined"){}else
  {
    data['Descripcion']=req.body.descripcion;
  }

  if(Object.keys(data).length<1 || !req.body.id) {
    res.sendStatus(400);

  }else
  {
    rolesModel.put(id,data,function(error,datos){
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
