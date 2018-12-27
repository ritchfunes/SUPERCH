var express = require('express');
var modelovehiculoModel = require('../models/ModeloVehiculo');


exports.updatemodelovehiculo = function(req , res)
{

    pk_ModeloVehiculo = req.body.pk_ModeloVehiculo ; 
    Data = {
        Modelo: req.body.Modelo ,
        FK_MarcaVehiculo: req.body.FK_MarcaVehiculo , 
        Activo: req.body.Activo 
        }
        modelovehiculoModel.updatemodelovehiculo(  pk_ModeloVehiculo , Data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deletemodelovehiculo = function (req , res , next )
{
    pk_ModeloVehiculo = req.body.pk_ModeloVehiculo ;

    modelovehiculoModel.deletemodelovehiculo(pk_ModeloVehiculo , function(error,data){

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


exports.insertmodelovehiculo = function(req , res)
{

  var Data =
  {
    Modelo:  req.body.Modelo , 
    FK_MarcaVehiculo: req.body.FK_MarcaVehiculo , 
    Activo: 1  
  }

  modelovehiculoModel.insertmodelovehiculo(Data , function(error , data) {
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


exports.getmodelovehiculo = function (req , res , next)
{


    modelovehiculoModel.getmodelovehiculo ( function(error , data) { 
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
