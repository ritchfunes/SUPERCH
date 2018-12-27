/**
 * Created by Walter Suazo on 04/01/2016.
 */
var express = require('express');
var empresasModel = require('../models/Empresa');

exports.post = function(req,res)
{

  if(typeof req.body.nombre === "undefined"){
    res.sendStatus(403);
  }
  if(typeof req.body.descripcion==="undefined")
  {
    res.sendStatus(403);
  }

  var Data=
  {
    Nombre:req.body.nombre,
    Descripcion:req.body.descripcion,
    FK_SocioId:req.socio,
    Activo:1
  }
  empresasModel.guardar(Data,function(error,data){
    if(data && data.insertId)
    {
      res.send({msg:true,
        info: {id:data.insertId}
      });
    }
    else
    {
      res.sendStatus(500);
    }

  });
}


exports.get = function(req,res,next)
{
  socio = req.socio;

  empresasModel.listar(socio,function(error,data){
    if(data )
    {
      res.send({msg:true,
        info: data});
    }
    else
    {
      console.log(error);
      res.sendStatus(500);
    }
  });
}


exports.delete = function(req,res,next)
{
  id = req.body.id;
  empresasModel.eliminar(id,function(error,data){
    if(data )
    {
      res.sendStatus(200);
    }
    else
    {
      res.sendStatus(500);
      console.log(error);
    }
  });
}

exports.put = function(req,res)
{
var empresa=req.empresa;
  var id = req.body.id;
  var Data={}
  if(!req.body.descripcion){}else
  {
    Data['descripcion']=req.body.descripcion
  }
  if(!req.body.nombre){}else
  {
    Data['Nombre']=req.body.nombre;
  }

  if(typeof req.body.activo ==="undefined"){}else
  {
    Data['Activo']=req.body.activo;
  }
  if (Object.keys(Data).length<1)
  {
    res.sendStatus(400);
    console.log("bad request");
  }else
  {

    empresasModel.update(id,Data,function(error,data){
      if(error)
      {
        console.log(error);
        res.send(500);
      }
      else
      {
        res.sendStatus(200);
      }

    });
  }

}
