var express = require('express');
var proyeccionplanturnosModel = require('../models/Proyeccionplanturnos');



exports.updateproyeccionplanturnos = function(req , res)
{

    PK_PlanTurnos = req.body.PK_PlanTurnos ; 
    data = {
        FK_Turno: req.body.FK_Turno ,
        Cantidad: req.body.Cantidad , 
        Fecha: req.body.Fecha , 
        Real: req.body.Real , 
        Activo: req.body.Activo, 
        Cumplimiento: req.body.Cumplimiento
        }
        proyeccionplanturnosModel.updateproyeccionplanturnos(  PK_PlanTurnos , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}


exports.deleteproyeccionplanturnos = function (req , res , next )
{
    PK_PlanTurnos = req.body.PK_PlanTurnos ;

    proyeccionplanturnosModel.deleteproyeccionplanturnos(PK_PlanTurnos , function(error,data){

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



exports.insertproyeccionplanturnos = function(req , res)
{

  var Data =
  {
    FK_Turno:  req.body.FK_Turno , 
    Cantidad: req.body.Cantidad ,
    Fecha: req.body.Fecha , 
    Real: req.body.Real  , 
    Activo: req.body.Activo , 
    Cumplimiento: req.body.Cumplimiento

  }

  proyeccionplanturnosModel.insertproyeccionplanturnos(Data , function(error , data) {
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



exports.getproyeccionplanturnos = function (req , res , next)
{


    proyeccionplanturnosModel.getproyeccionplanturnos ( function(error , data) { 
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
