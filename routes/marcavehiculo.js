var express = require('express');
var marcavehiculoModel = require('../models/MarcaVehiculo');


exports.updatemarcavehiculo = function(req , res)
{

    PK_MarcaVehiculo = req.body.PK_MarcaVehiculo ; 
    Data = {
        Descripcion: req.body.Descripcion ,
        TipoVehiculo: req.body.TipoVehiculo , 
        Activo: req.body.Activo 
        }
        marcavehiculoModel.updatemarcavehiculo(  PK_MarcaVehiculo , Data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deletemarcavehiculo = function (req , res , next )
{
    PK_MarcaVehiculo = req.body.PK_MarcaVehiculo ;

    marcavehiculoModel.deletemarcavehiculo(PK_MarcaVehiculo , function(error,data){

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

exports.insertmarcavehiculo = function(req , res)
{

  var Data =
  {
    TipoVehiculo:  req.body.TipoVehiculo , 
    Descripcion: req.body.Descripcion , 
    Activo: 1  
  }

  marcavehiculoModel.insertmarcavehiculo(Data , function(error , data) {
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


exports.getmarcavehiculo = function (req , res , next)
{


    marcavehiculoModel.getmarcavehiculo ( function(error , data) { 
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
