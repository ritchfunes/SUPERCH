var express = require('express');
var proyeccionplanunidadesModel = require('../models/Proyeccionplanunidades');



exports.deleteproyeccionplanunidades = function (req , res , next )
{
    PK_PlanUnidades = req.body.PK_PlanUnidades ;

    proyeccionplanunidadesModel.deleteproyeccionplanunidades(PK_PlanUnidades , function(error,data){

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



exports.updateproyeccionplanunidades = function(req , res)
{

    PK_PlanUnidades = req.body.PK_PlanUnidades ; 
    data = {
  
        FK_Estado:  req.body.FK_Estado , 
        Cantidad: req.body.Cantidad ,
        Fecha: req.body.Fecha , 
        Cabezal: req.body.Cabezal  , 
        Activo: req.body.Activo
        }
        proyeccionplanunidadesModel.updateproyeccionplanunidades(  PK_PlanUnidades , data , function (err , data){  
            if(err)
            {
                console.log(err) ; 
                res.send({ err:1 }) ; 
            } else {
                res.send({result:'ok',info:data }) ; 
            }

        });

}



exports.insertproyeccionplanunidades = function(req , res)
{

  var Data =
  {
    FK_Estado:  req.body.FK_Estado , 
    Cantidad: req.body.Cantidad ,
    Fecha: req.body.Fecha , 
    Cabezal: req.body.Cabezal , 
    Activo: req.body.Activo 

  }

  proyeccionplanunidadesModel.insertproyeccionplanunidades(Data , function(error , data) {
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



exports.getproyeccionplanunidades = function (req , res , next)
{


    proyeccionplanunidadesModel.getproyeccionplanunidades ( function(error , data) { 
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
