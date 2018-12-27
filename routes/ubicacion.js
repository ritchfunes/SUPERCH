var express = require('express'); 
var ubicacionModel = require('../models/Ubicacion');


exports.updateubicacion = function(req , res){
    PKUbicacion = req.body.PKUbicacion ; 

    Data = {
        Codigo: req.body.Codigo , 
        Descripcion: req.body.Descripcion ,
        FKTaller: req.body.FKTaller ,
        Activo: 1 
    }

     ubicacionModel.updateubicacion( PKUbicacion , Data , function(err , data){
          if(err)
          {
            console.log(err) ; 
                res.send({ err:1 }) ; 
          }else {
            res.send({result:'ok',info:data }) ; 
          }
     });
}

exports.deleteubicacion = function(req , res , next )
{
    PKUbicacion = req.body.PKUbicacion ;

    ubicacionModel.deleteubicacion(PKUbicacion , function(eror , data){
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

exports.insertubicacion = function(req , res ){
    var Data ={
        Codigo: req.body.Codigo , 
        Descripcion: req.body.Descripcion ,
        FKTaller: req.body.FKTaller ,
        Activo: 1 
    }
  
  ubicacionModel.insertubicacion(Data , function(error , data) {
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

exports.getubicacion = function(req , res , next)
{
    ubicacionModel.getubicacion (function(error , data ){
      if(data)
      {
        res.send({ msg:true , 
            info:data   }) ;
      } else {
        res.send({msg:false});

      }   

    });
}