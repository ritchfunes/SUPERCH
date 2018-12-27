var express = require('express');
var tipofallaModel = require('../models/Tipofalla');


exports.updatetipofalla = function(req , res)
{

    Pk_tipofalla = req.body.Pk_tipofalla ; 
    Data = {
        Descripcion: req.body.Descripcion ,
        Falla: req.body.Falla , 
        Activo: req.body.Activo 
        }
        tipofallaModel.updatetipofalla(  Pk_tipofalla , Data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deletetipofalla = function (req , res , next )
{
    Pk_tipofalla = req.body.Pk_tipofalla ;

    tipofallaModel.deletetipofalla(Pk_tipofalla , function(error,data){

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

exports.inserttipofalla = function(req , res)
{

  var Data =
  {
    Falla:  req.body.Falla , 
    Descripcion: req.body.Descripcion , 
    Activo: 1  
  }

  tipofallaModel.inserttipofalla(Data , function(error , data) {
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


exports.gettipofalla = function (req , res , next)
{


    tipofallaModel.gettipofalla ( function(error , data) { 
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
