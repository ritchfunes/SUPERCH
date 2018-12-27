var express = require('express');
var unidadesdisponiblesModel = require('../models/Unidadesdisponibles');



exports.getDisponibilidadunidadessemanal = function( req , res , next )
{


    data={
        Semana:req.query.Semana
      };
        unidadesdisponiblesModel.getDisponibilidadunidadessemanal(  data ,  function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}


exports.insertDisponibilidadunidadessemanal = function (req , res , next)
{


    unidadesdisponiblesModel.insertDisponibilidadunidadessemanal ( function(error , data) { 
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


exports.updateunidadesdisponibles = function(req , res)
{

    PK_UnidadesDisponibles = req.body.PK_UnidadesDisponibles ; 
    data = {
        FK_Unidades: req.body.FK_Unidades ,
        FK_Estado: req.body.FK_Estado , 
        Estado: req.body.Estado , 
        Comentario: req.body.Comentario , 
        FechaEntrega: req.body.FechaEntrega , 
        FechaAsignacion: req.body.FechaAsignacion , 
        FK_Empresa: req.body.FK_Empresa , 
        Activo: req.body.Activo 
        }
        unidadesdisponiblesModel.updateunidadesdisponibles(  PK_UnidadesDisponibles , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.deleteunidadesdisponibles = function (req , res , next )
{
    PK_UnidadesDisponibles = req.body.PK_UnidadesDisponibles ;

    unidadesdisponiblesModel.deleteunidadesdisponibles(PK_UnidadesDisponibles , function(error,data){

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


exports.insertunidadesdisponibles = function(req , res)
{

  var Data =
  {
    FK_Unidades:  req.body.FK_Unidades , 
    FK_Estado: req.body.FK_Estado ,
    Estado: req.body.Estado , 
    Comentario: req.body.Comentario , 
    FechaEntrega: req.body.FechaEntrega , 
    FechaAsignacion: req.body.FechaAsignacion , 
    FK_Empresa: req.body.FK_Empresa , 
    Activo: req.body.Activo 
  }

  unidadesdisponiblesModel.insertunidadesdisponibles(Data , function(error , data) {
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


exports.getunidadesdisponibles = function (req , res , next)
{


    unidadesdisponiblesModel.getunidadesdisponibles ( function(error , data) { 
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


exports.getunidadesdisponiblesonline = function (req , res , next)
{


    unidadesdisponiblesModel.getunidadesdisponiblesonline ( function(error , data) { 
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