/**
 * Created by Roberto on 27/07/2015.
 */
var express = require('express');
var categoriasModel = require('../models/Categorias');




exports.guardar = function(req,res)
{
  empresa = req.empresa;
  var Data=
  {
    Categoria:req.body.categoria,
    Descripcion:req.body.descripcion,
    FK_EmpresaId:empresa
  }
  categoriasModel.guardar(Data,function(error,data){
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


exports.listar = function(req,res,next)
{
  empresa = req.empresa;
  categoriasModel.listar(empresa,function(error,data){
    if(data )
    {
      res.send({msg:true,
        info: data});
    }
    else
    {
      res.send({"msg":false});
    }
  });
}


exports.eliminar = function(req,res,next)
{
  id = req.body.id;


  categoriasModel.eliminar(id,function(error,data){
    if(data )
    {
      res.send({msg:true});
    }
    else
    {
      res.send({msg:false});
      console.log(error);
    }
  });
}


exports.modificar = function(req,res)
{
  var empresa = req.empresa;
  var id = req.body.id;
  var Data={}
  if(!req.body.descripcion){}else
  {
    Data['descripcion']=req.body.descripcion
  }
 if(!req.body.categoria){}else
 {
   Data['Categoria']=req.body.categoria;
 }

  if (Object.keys(Data).length<1)
  {
   res.sendStatus(400);
    console.log("bad request");
  }else
  {
    Data['FK_EmpresaId']=empresa;
    categoriasModel.update(id,Data,function(error,data){
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
