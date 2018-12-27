
var express = require('express');
var estadosunidadesModel = require('../models/Estadosunidades');


exports.updateestadosunidades = function(req , res)
{

    PK_Estado = req.body.PK_Estado ; 
    data = {
        Estado: req.body.Estado ,
        Observacion: req.body.Observacion , 
        Activo: req.body.Activo
        }
        estadosunidadesModel.updateestadosunidades(  PK_Estado , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deleteestadosunidades = function (req , res , next )
{
    PK_Estado = req.body.PK_Estado ;

    estadosunidadesModel.deleteestadosunidades(PK_Estado , function(error,data){

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



exports.insertestadosunidades = function(req , res)
{

  var Data =
  {
    Estado:  req.body.Estado , 
    Observacion: req.body.Observacion 
  }

  estadosunidadesModel.insertestadosunidades(Data , function(error , data) {
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




exports.getestadosunidades = function (req , res , next)
{


    estadosunidadesModel.getestadosunidades ( function(error , data) { 
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
