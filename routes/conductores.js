/**
 * Created by GMG on 21/03/2016.
 */

var express=require('express');
var conductorModel=require('../models/Conductores');
var underscore=require('underscore');

exports.crear=function(req,res)
{
    //console.log("body: "+req.body);
    var Data={
        Nombre:req.body.nombre,
        Apellido:req.body.apellido,
        Telefono:req.body.telefono,
        Direccion:req.body.direccion,
        Identidad:req.body.identidad,
        FechaExpLicencia:req.body.fechaExp,
        IdFicha:req.body.ficha,
        FK_EmpresaId:req.empresa,
        CodigoSAT: req.body.codigo,
        Estado: req.body.estado ? req.body.estado : 0
    };

    console.log("to query: "+Data);
    conductorModel.crear(Data,function(error,data){
        if(data && data.insertId){
            res.send({
                msg:true,
                info: {id:data.insertId}
            });
        }else{
            res.sendStatus(500);
        }
    });
}

exports.listar=function(req,res,next){

    empresa=req.empresa;
    if (empresa == 66){
        conductorModel.listarTodos(empresa, function(error, data){
            if (data){
                res.status(200).send({
                    msg:true,
                    info:data,
                    cantidad:data.length
                });
            } else{
                res.sendStatus(500);
            }
        });
    }else{
        conductorModel.listar(empresa,function(error,data){
            if(data){
                res.send({
                    msg:true,
                    info:data,
                    cantidad:data.length
                });
            }else {
                res.send({msg:false});
            }
        });
    }   
}

exports.listarConductoresDisponbles =function(req,res,next){

    //empresa=req.empresa;
    conductorModel.conductoresDisponibles(function(error,data){
        if(data){
            res.send({
                msg:true,
                info:data,
                cantidad:data.length
            });
        }else {
            res.status(500).send({msg:false});
        }
    });
}

exports.eliminar= function (req,res,next) {
    id=req.body.id;

    conductorModel.eliminar(id,function(error,data){
        if(data){
            res.send({msg:true});
        }else{
            res.send({msg:false});
            console.log(error);
        }
    });
}

exports.actualizar=function(req,res){
    var id=req.body.id;
    var Data={};

    if(typeof req.body.nombre==="undefined"){}else{
        Data['Nombre']=req.body.nombre;
    }

    if(typeof req.body.apellido==="undefined"){}else{
        Data['Apellido']=req.body.apellido;
    }

    if(typeof req.body.telefono==="undefined"){}else{
        Data['Telefono']=req.body.telefono;
    }

    if(typeof req.body.direccion==="undefined"){}else{
        Data['Direccion']=req.body.direccion;
    }

    if(typeof req.body.identidad==="undefined"){}else{
        Data['Identidad']=req.body.identidad;
    }

    if(typeof req.body.fechaExp==="undefined"){}else{
        Data['FechaExpLicencia']=req.body.fechaExp;
    }

    if(typeof req.body.ficha==="undefined"){}else{
        Data['IdFicha']=req.body.ficha;
    }

    if(typeof req.body.empresa==="undefined"){}else{
        Data['FK_EmpresaId']=req.body.empresa;
    }

    if(typeof req.body.codigo !== "undefined"){
        Data['CodigoSAT'] = req.body.codigo;
    }

    if(typeof req.body.estado !== "undefined"){
        Data['Estado'] = req.body.estado;
    }

    console.log(Data);

    if(Object.keys(Data).length<1){
        res.sendStatus(400);
        console.log("bad request");
    }else{
        conductorModel.actualizar(id,Data,function(error, data){
           if(error){
               console.log(error);
               res.send(500);
           } else{
               res.sendStatus(200);
           }
        });
    }
}

exports.conductorSinViaje = function(req,res){
    conductorModel.sinViaje(function(err, result){
        if(err){
            res.status(500).send({
                error: err
            });
        }else{
            res.send({
                title: "Conductores sin Viaje",
                info: result,
                cantidad: result.length
            });
        }
    });
};
