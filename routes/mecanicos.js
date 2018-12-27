var express = require('express'); 
var mecanicoModel = require('../models/Mecanico');


exports.updatemecanico = function(req , res){
    PKMecanico = req.body.PKMecanico ; 

    Data = {
        Nombre: req.body.Nombre , 
        Apellido: req.body.Apellido ,
        Telefono: req.body.Telefono ,
        Direccion: req.body.Direccion ,
        FKTaller: 1,
        Identidad: req.body.Identidad ,
        FKEstado: req.body.FKEstado ,
        Activo: 1 
    }

    mecanicoModel.updatemecanico( PKMecanico , Data , function(err , data){
          if(err)
          {
            console.log(err) ; 
                res.send({ err:1 }) ; 
          }else {
            res.send({result:'ok',info:data }) ; 
          }
     });
}

exports.deletmecanico = function(req , res , next )
{
    PKMecanico = req.body.PKMecanico ;

    mecanicoModel.deletmecanico(PKMecanico , function(eror , data){
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

exports.insertmecanico = function(req , res ){
    var Data ={
        Nombre: req.body.Nombre , 
        Apellido: req.body.Apellido ,
        Telefono: req.body.Telefono ,
        Direccion: req.body.Direccion ,
        FKTaller: 1,
        Identidad: req.body.Identidad ,
        FKEstado: req.body.FKEstado ,
        Activo: 1 
    }
  
    mecanicoModel.insertmecanico(Data , function(error , data) {
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



exports.getmecanico = function(req , res , next)
{
    mecanicoModel.getmecanico (function(error , data ){
      if(data)
      {
        
        res.send({ msg:true , 
        info:data




       
  //  contacts:data  

        }
    ) ;
      } else {
        res.send({msg:false});

      }   

    });
}