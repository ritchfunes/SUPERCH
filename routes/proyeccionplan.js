var express = require('express');
var proyeccionplanModel = require('../models/Proyeccionplan');


exports.deleteproyeccionplan = function (req , res , next )
{
    PK_Plan = req.body.PK_Plan ;

    proyeccionplanModel.deleteproyeccionplan(PK_Plan , function(error,data){

        if(data)
        {
            res.send({ msg:true }) ;
        }
        else {
            res.send({ msg:false }) ;
            console.log(error);
        }
    } ) ; 
} 



exports.updateproyeccionplan = function(req , res)
{

    PK_Plan = req.body.PK_Plan ; 
    data = {
        Destino:  req.body.Destino , 
    Dia: req.body.Dia ,
    Fecha: req.body.Fecha , 
    TotalUnidades: req.body.TotalUnidades , 
    Recarga: req.body.Recarga , 
    CantidadRecarga: req.body.CantidadRecarga , 
    FK_ViajeCompleto: req.body.FK_ViajeCompleto , 
    Activo: req.body.Activo
        }
        proyeccionplanModel.updateproyeccionplan(  PK_Plan , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.insertproyeccionplan = function(req , res)
{

  var Data =
  {
    Destino:  req.body.Destino , 
    Dia: req.body.Dia ,
    Fecha: req.body.Fecha , 
    TotalUnidades: req.body.TotalUnidades , 
    Recarga: req.body.Recarga , 
    CantidadRecarga: req.body.CantidadRecarga , 
    FK_ViajeCompleto: req.body.FK_ViajeCompleto ,
    Activo: req.body.Activo 

  }

  proyeccionplanModel.insertproyeccionplan(Data , function(error , data) {
  if(data && data.insertId )
    {
        res.send ({ msg:true, 
        info:{id: data.insertId } 
       }) ;
    }
    else 
    {
       res.sendStatus(500) ; 
    }
  });

}



exports.getproyeccionplan = function (req , res , next)
{


    proyeccionplanModel.getproyeccionplan ( function(error , data) { 
        if(data)
        {
            res.send({ msg:true , 
                info:data   }) ;
        }
        else {
            res.send({msg:false}) ;
        }

    } ) ;

}
