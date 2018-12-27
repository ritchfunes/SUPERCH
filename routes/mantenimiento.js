var express = require('express'); 
var mantenimientoModel = require('../models/Mantenimiento');


exports.updatemantenimiento = function(req , res){
    PK_Mantenimiento = req.body.PK_Mantenimiento ; 

    Data = {
        Planificado: req.body.Planificado , 
        Fecha_Planificacion: req.body.Fecha_Planificacion ,
        Carburante: req.body.Carburante ,
        Tipo_Mantenimiento: req.body.Tipo_Mantenimiento ,
        FK_TipoFalla: req.body.FK_TipoFalla ,
        FK_ModeloUnidades: req.body.FK_ModeloUnidades ,
        Kilometraje: req.body.Kilometraje ,
        Categoria: req.body.Categoria ,
        Motivo: req.body.Motivo ,
        Fecha_Ingreso: req.body.Fecha_Ingreso ,
        Fecha_Entrega: req.body.Fecha_Entrega ,
        FK_Conductores: req.body.FK_Conductores ,
        Observaciones: req.body.Observaciones ,
        FK_Mecanico: req.body.FK_Mecanico ,
        FK_Conductores: req.body.FK_Conductores ,
        Activo: 1 
    }

    mantenimientoModel.updatemantenimiento( PK_Mantenimiento , Data , function(err , data){
          if(err)
          {
            console.log(err) ; 
                res.send({ err:1 }) ; 
          }else {
            res.send({result:'ok',info:data }) ; 
          }
     });
}

exports.deletemantenimiento = function(req , res , next )
{
    PK_Mantenimiento = req.body.PK_Mantenimiento ;

    mantenimientoModel.deletemantenimiento(PK_Mantenimiento , function(eror , data){
        if(data)
        {
            res.send({ msg:true }) ;
        }
        else {
            res.send({ msg:false }) ;
            console.log(error);
        }

    }) ;

}

exports.insertmantenimiento = function(req , res ){
    var Data ={
        Planificado: req.body.Planificado , 
        Fecha_Planificacion: req.body.Fecha_Planificacion ,
        Carburante: req.body.Carburante ,
        Tipo_Mantenimiento: req.body.Tipo_Mantenimiento ,
        FK_TipoFalla: req.body.FK_TipoFalla ,
        FK_ModeloUnidades: req.body.FK_ModeloUnidades ,
        Kilometraje: req.body.Kilometraje ,
        Categoria: req.body.Categoria ,
        Motivo: req.body.Motivo ,
        Fecha_Ingreso: req.body.Fecha_Ingreso ,
        Fecha_Entrega: req.body.Fecha_Entrega ,
        FK_Conductores: req.body.FK_Conductores ,
        Observaciones: req.body.Observaciones ,
        FK_Mecanico: req.body.FK_Mecanico ,
        FK_Conductores: req.body.FK_Conductores ,
        Activo: 1 
    }
  
    mantenimientoModel.insertmantenimiento(Data , function(error , data) {
   if(data && data.insertId)
   {
    res.send ({ msg:true, 
        info:{id: data.insertId } 
       }) ;
   }
   else{
    res.sendStatus(500) ; 
   }
  } ) ;

}



exports.getmantenimiento = function(req , res , next)
{
    mantenimientoModel.getmantenimiento (function(error , data ){
      if(data)
      {
        res.send({ msg:true , 
            info:data   }) ;
      } else {
        res.send({msg:false});

      }   

    });
}