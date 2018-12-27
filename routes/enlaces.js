/**
 * Created by GMG on 14/06/2016.
 */
var express=require('express');
var enlacesModel=require('../models/Enlaces');
var bitacora = require('../models/Bitacora');
var moment = require('moment');

exports.listaEnlazados= function (req,res) {
    enlacesModel.getEnlazados(req.empresa,function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            res.send({
                title: "Lista Enlazados",
                msg: true,
                info: data,
                cantidad: data.length
            });
        }
    })
};

exports.listarUnidadesSinEnlace=function(req,res){
    enlacesModel.getUnidades(req.empresa,function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else {
            res.send({
                title: "Lista Unidades Sin Enlazar",
                msg: true,
                info: data,
                cantidad: data.length
            });
        }
    });
};

exports.listaRastrasSinEnlace= function (req,res) {
    enlacesModel.getRastras(function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else {
            res.send({
                title: "Lista Unidades Sin Enlazar",
                msg: true,
                info: data,
                cantidad: data.length
            });
        }
    });
};

exports.enlazar= function (req,res) {
    /*Data={
        FK_UnidadId: req.body.unidadId,
        FK_RastraId: req.body.rastraId
    }*/
    var d = new Date(); 
    rawData=req.body;
    Data=[];
    linkBitacora=[];
    for(i in rawData){
        Data.push(
            "("+ rawData[i]["unidadId"] + ", " + rawData[i]["rastraId"] +", NOW() " + " )"
        );
        linkBitacora.push(rawData[i]['nombreRastra']+" + "+rawData[i]['nombreUnidad'])
    }
   // console.log(Data);

    enlacesModel.post(Data, function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            record={
                IdUsuario:req.user,
                idEvento:6,
                Mensaje: "Enlace - "+linkBitacora.toString(),
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.send({
                msg: true,
                info: data.insertId
            });
        }
    })
};

exports.desenlazar= function (req,res) {
    idEnlace=req.body.id;
    enlacesModel.delete(idEnlace, function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            record={
                IdUsuario:req.user,
                idEvento:6,
                Mensaje: "Desenlace - "+req.body.enlace,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.send({
                msg: true
            });
        }
    })
};

exports.crearRastra= function (req,res) {
    data={
        Rastra: req.body.rastra,
        Barcode: req.body.barcode
    };

    if(typeof req.body.placa==="undefined"){}else{
        data['Placa']=req.body.placa;
    }

    enlacesModel.postRastra(data, function (error, result) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            record={
                IdUsuario:req.user,
                idEvento:6,
                Mensaje: "Rastra Creada - "+req.body.rastra,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.send({
                msg: true
            });
        }
    });
};

exports.listarRastras=function(req,res){
    enlacesModel.listRastras(function (error, result) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.send({
                title: "Lista de Rastras",
                msg: true,
                info: result
            });
        }
    });
};

exports.editarRastra=function(req,res){
    id=req.body.RastraId;
    data={
        Rastra: req.body.Rastra,
        Barcode: req.body.Barcode
    };

    if(typeof req.body.Placa==="undefined"){}else{
        data['Placa']=req.body.placa;
    }

    enlacesModel.updateRastra(id,data, function (error, result) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            record={
                IdUsuario:req.user,
                idEvento:6,
                Mensaje: "Rastra Modificada - "+req.body.Rastra,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.send({
                msg: true
            });
        }
    });
};