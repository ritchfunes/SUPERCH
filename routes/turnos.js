
var express = require('express');
var turnosModel = require('../models/Turnos');


exports.getturnos = function (req , res , next)
{

    turnosModel.getturnos ( function(error , data) { 
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


exports.deleteturno = function (req , res , next )
{
    PK_Turno = req.body.PK_Turno ;

    turnosModel.deleteturno(PK_Turno , function(error,data){

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



exports.insertturno = function(req , res)
{

  var Data =
  {
    Turno:  req.body.Turno , 
    Descripcion: req.body.Descripcion ,
    HoraInicio: req.body.HoraInicio , 
    HoraFin: req.body.HoraFin, 
    Activo: req.body.Activo
  }

  turnosModel.insertturno(Data , function(error , data) {
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

exports.updateturno = function(req , res)
{

    PK_Turno = req.body.PK_Turno ; 
    data = {
        Turno: req.body.Turno ,
        Descripcion: req.body.Descripcion , 
        HoraInicio: req.body.HoraInicio ,
        HoraFin: req.body.HoraFin , 
        Activo: req.body.Activo

        }
        turnosModel.updateturno(  PK_Turno , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}


exports.getturno = function (req , res )
{
    pkturno = req.body.pkturno ;
    turnosModel.getturno ( pkturno ,  function(  error , data) { 
        if(error)
        {
            console.log(error);
                res.sendStatus(500);
        }
        else {
            res.send(data);
        }

    } ) ;
   

}



