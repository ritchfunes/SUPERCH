/**
 * Created by Roberto on 27/07/2015.
 */
var express = require('express');
var referenciaModel = require('../models/Referencias');
var bitacora = require('../models/Bitacora');
var moment = require('moment');

exports.referenciasIconos = function(req,res)
{
    referenciaModel.referenciasIconos(function(error,data){
        if (error)
        {
            res.send('error');
        } else{
            res.send({
                title : "Listado ReferenciasIconos",
                info : data
            });
        }
    })
};


exports.guardar = function(req,res,next)
{
    empresa = req.empresa;


    var Data=
    {
        Nombre:req.body.nombre,
        Descripcion:req.body.descripcion,
        Latitud: req.body.latitud,
        Longitud: req.body.longitud,
        FK_EmpresaId:empresa,
        FK_IconoId : req.body.iconoId,
        Visible: req.body.visible,
        FK_CategoriaId:req.body.categoriaId
    };

    console.log(Data);

    referenciaModel.guardar(Data,function(error,data){

        console.log(error);
        if(data && data.insertId)
        {
            record={
                IdUsuario:req.user,
                idEvento:5,
                Mensaje: "Referencia Creada - "+Data.Nombre,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.json({msg:true,
                      info: {id:data.insertId}
                    });
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }

    });
};


exports.listar = function(req,res,next)
{
    empresa = req.empresa;
    referenciaModel.listar(empresa,function(error,data){
        if(data )
        {
            res.send({msg:true,
                info: data,
                cantidada:data.length
            });
        }
        else
        {
            res.send({"msg":"false"});
        }
    });
};


exports.eliminar = function(req,res)
{
    empresa = req.empresa;
    id = req.query.id;
    console.log(id);
    referenciaModel.eliminar(id,function(error,data){
        if(data )
        {
            record={
                IdUsuario:req.user,
                idEvento:5,
                Mensaje: "Referencia Eliminada - "+req.query.Nombre,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.json({msg:true});
        }
        else
        {
            if(error) {
                console.log(error);
                if (error.errno == 1451) {
                    res.status(428).send({
                        msg:"Advertencia: Primero debe eliminar la referencia de los lugares autorizados"
                    });
                }
                else {
                    res.status(500).send({msg: "Error"});
                }
            }
        }
    });

};

exports.modificar=function(req, res){
    var id=req.body.id;
    var Data={};
    if(typeof req.body.nombre==="undefined"){}else{
        Data['Nombre']=req.body.nombre;
    }
    if(typeof req.body.descripcion==="undefined"){}else{
        Data['Descripcion']=req.body.descripcion;
    }
    if(typeof req.body.lat==="undefined"){}else{
        Data['Latitud']=req.body.lat;
    }
    if(typeof req.body.lon==="undefined"){}else{
        Data['Longitud']=req.body.lon;
    }
    if(typeof req.body.iconoId==="undefined"){}else{
        Data['FK_IconoId']=req.body.iconoId;
    }
    if(typeof req.body.categoriaId==="undefined"){}else{
        Data['FK_CategoriaId']=req.body.categoriaId;
    }
    if(typeof req.body.visible==="undefined"){}else{
        Data['Visible']=req.body.visible;
    }

    if(Data.length!=0){
        //llamado al modelo
        referenciaModel.put(id,Data, function (error,result) {
            if(error){
                console.log(error);
                res.sendStatus(500);
            }else{
                record={
                    IdUsuario:req.user,
                    idEvento:5,
                    Mensaje: "Referencia Modificada - "+Data.Nombre,
                    fecha: moment.utc().format()
                };
                bitacora.addUser(record, function (error, data) {});
                res.send({
                    msg:true
                })
            }
        })
    }else{
        console.log("json vacio");
    }
};