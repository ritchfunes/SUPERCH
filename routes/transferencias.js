/**
 * Created by Jeffry Romero on 09/09/2016.
 */
var express=require('express');
var transModel=require('../models/Transferencias');
var bitacora = require('../models/Bitacora');
var moment = require('moment');

exports.guardar= function (req,res) {
    data={
        Imei:req.body.imei,
        Transferencia:req.body.transferencia,
        FechaHora: req.body.fechahora,
        Rastra: req.body.rastra,
        FK_ViajeCompletoId: req.body.viajecompleto,
        FK_ConductoresId : req.body.FK_ConductoresId  
    };

    if(typeof req.body.ventanaAtencion==="undefined"){
        data['VentanaAtencion']=null;
    }else{
        data['VentanaAtencion']=req.body.ventanaAtencion;
    }

    if(typeof req.body.ventanaRetorno==="undefined"){
        data['VentanaRetorno']=null;
    }else{
        data['VentanaRetorno']=req.body.ventanaRetorno;
    }

    if(typeof req.body.observacion==="undefined"){
        data['Observacion']="";
    }else{
        data['Observacion']=req.body.observacion;
    }

    transModel.postTransferencia(data,function (error,Data) {
        if(error){
            res.sendStatus(500);
        }else{
            record={
                IdUsuario:req.user,
                idEvento:7,
                Mensaje: "Creada - "+data.Transferencia,
                fecha: moment.utc().format()
            };
            bitacora.addUser(record, function (error, data) {});
            res.status(200).send({msg:true});
        }
    });
};

exports.listar= function (req,res) {
    data={
    };
    transModel.getTransferencias(data,function (error,data) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                title:"Lista de Trasferencias",
                msg:true,
                cantidad:data.length,
                info:data
            });
        }
    });
};

exports.listarTransferenciasTerminadas= function (req,res) {
    data={
    };
    transModel.getTransferenciasTerminadas(data,function (error,data) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                title:"Lista de Transferencias Terminadas",
                msg:true,
                cantidad:data.length,
                info:data
            });
        }
    });
};

exports.edit= function (req,res) {
    id=req.body.id;
    data={};

    if(typeof req.body.imei==="undefined"){
        data['Imei']=null;
    }else{
        data['Imei']=req.body.imei;
    }

    if(typeof req.body.transferencia==="undefined"){
        data['Imei']=null;
    }else{
        data['Transferencia']=req.body.transferencia;
    }

    if(typeof req.body.fechahora==="undefined"){
        data['Imei']=null;
    }else{
        data['FechaHora']=req.body.fechahora;
    }

    if(typeof req.body.origen==="undefined"){}else{
        data['Cod_Origen']=req.body.origen;
    }

    if(typeof req.body.destino==="undefined"){}else{
        data['Cod_Destino']=req.body.destino;
    }

    if(typeof req.body.ventanaAtencion==="undefined"){}else{
        data['VentanaAtencion']=req.body.ventanaAtencion;
    }

    if(typeof req.body.ventanaRetorno==="undefined"){}else{
        data['VentanaRetorno']=req.body.ventanaRetorno;
    }

    if(typeof req.body.rastra==="undefined"){}else{
        data['Rastra']=req.body.rastra;
    }

    if(typeof req.body.viajecompleto==="undefined"){
        data['Imei']=null;
    }else{
        data['FK_ViajeCompletoId']=req.body.viajecompleto;
    }

    if(typeof req.body.estado==="undefined"){}else{
        data['Estado']=req.body.estado;
    }

    if(typeof req.body.observacion==="undefined"){
        data['Observacion']="";
    }else{
        data['Observacion']=req.body.observacion;
    }

    if(data.Imei != null){
        transModel.putTransferencia(id,data, function (error,result) {
            if(error){
                res.sendStatus(500);
            }else{
                record={
                    IdUsuario:req.user,
                    idEvento:8,
                    Mensaje: "Editada - "+data.Transferencia,
                    fecha: moment.utc().format()
                };
                bitacora.addUser(record, function (error, data) {});
                res.status(200).send({
                    title: "Conductor nuevo",
                    msg:true,
                    info: result[0]
                });
            }
        });
    }else{
        res.sendStatus(400);
    }
};

exports.check= function (req,res) {
    data={
        imei: req.query.imei
    };

    transModel.checkTransferencia(data, function (error,result) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                tittle: "Transferencia Verificada",
                msg:true,
                info: result
            });
        }
    })
};

exports.sat = function(req, res){
    data = {
        Transferencia: req.body.transfer,
        Codigo: req.body.unit,
        Conductor: req.body.driver,
        Cod_Origen: req.body.origin,
        Cod_Destino: req.body.destiny,
        Fecha_Llegada: req.body.arrival_date,
        Hora_Llegada: req.body.arrival_time,
        Fecha_Retorno: req.body.return_date,
        Hora_Retorno: req.body.return_time
    };

    transModel.getImeiByCodigo(data.Codigo, function(error, result){
        if(error){
            res.sendStatus(500);
        }else{
            transModel.getViajeByCodigo(data.Cod_Destino, function(err, resp){
                if(err){
                    res.sendStatus(500);
                } else{
                    transferencia = { 
                        'Imei': result[0].Imei,
                        'Transferencia': data.Transferencia,
                        'FechaHora': moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                        'VentanaAtencion': moment(data.Fecha_Llegada + ' ' + data.Hora_Llegada).utc().format('YYYY-MM-DD HH:mm:ss'),
                        'VentanaRetorno': moment(data.Fecha_Retorno + ' ' + data.Hora_Retorno).utc().format('YYYY-MM-DD HH:mm:ss'),
                        'Rastra': data.Codigo,
                        'FK_ViajeCompletoId': resp[0][0].ViajeID,
                        'Conductor': data.Conductor
                    };
                    console.log(transferencia);

                    //save data
                    transModel.postSAT(transferencia,function (errorT,resT) {
                        if(errorT){
                            res.sendStatus(500);
                        }else{
                            record={
                                IdUsuario: 1,
                                idEvento:7,
                                Mensaje: "Creada - "+data.Transferencia,
                                fecha: moment.utc().format()
                            };
                            bitacora.addUser(record, function (error, data) {});
                            res.status(200).send({msg:true});
                        }
                    });
                }
            });
        }
    });
}