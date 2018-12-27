var express = require('express');
var modelounidadModel = require('../models/ModeloUnidad');


exports.updatemodelounidad = function(req , res)
{

    PK_ModeloUnidades = req.body.PK_ModeloUnidades ; 
    Data = {
        Imei:  req.body.Imei , 
        FK_ModeloVehiculo: req.body.FK_ModeloVehiculo ,
        Activo: req.body.Activo  , 
        Year: req.body.Year , 
        FK_EstadoUnidad: req.body.FK_EstadoUnidad  
       
        }
        modelounidadModel.updatemodelounidad(  PK_ModeloUnidades , Data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deletemodelounidad = function (req , res , next )
{
    PK_ModeloUnidades = req.body.PK_ModeloUnidades ;

    modelounidadModel.deletemodelounidad(PK_ModeloUnidades , function(error,data){

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


exports.insertmodelounidad = function(req , res)
{

  var Data =
  {
    Imei:  req.body.Imei , 
    FK_ModeloVehiculo: req.body.FK_ModeloVehiculo ,
    Activo: 1   , 
    Year: req.body.Year , 
    FK_EstadoUnidad: req.body.FK_EstadoUnidad 
  
  }

  modelounidadModel.insertmodelounidad(Data , function(error , data) {
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


exports.getmodelounidad = function (req , res , next)
{


    modelounidadModel.getmodelounidad ( function(error , data) { 
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
