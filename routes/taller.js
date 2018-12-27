var express = require('express');
var tallerModel = require('../models/Taller');


exports.updatetaller = function(req , res)
{

    PKTaller = req.body.PKTaller ; 
    Data = {
        NombreCorto: req.body.NombreCorto ,
        NombreLargo: req.body.NombreLargo , 
        Activo: req.body.Activo 
        }
        tallerModel.updatetaller(  PKTaller , Data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deleteTaller = function (req , res , next )
{
    PKTaller = req.body.PKTaller ;

    tallerModel.deleteTaller(PKTaller , function(error,data){

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

exports.inserttaller = function(req , res)
{

  var Data =
  {
    NombreCorto:  req.body.NombreCorto , 
    NombreLargo: req.body.NombreLargo , 
    Activo: 1  
  }

  tallerModel.inserttaller(Data , function(error , data) {
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


exports.getttaller = function (req , res , next)
{


    tallerModel.getttaller ( function(error , data) { 
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
