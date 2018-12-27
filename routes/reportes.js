/**
 * Created by GMG on 20/04/2016.
 */
var express=require('express');
var reportesModel=require('../models/Reportes');

exports.getRepAcceso= function (req,res) {
    empresa=req.empresa;
    reportesModel.getReporteAcceso(empresa, function (error,data) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.send({
                title:"Reporte de Acceso a Plataforma",
                msg:true,
                info:data,
                cantidad: data.length
            });
        }
    });
}

exports.getRepAccFecha= function (req,res) {
    empresa=req.empresa;
    Data={
        fechaInicio: req.query.fechainicio,
        fechaFin: req.query.fechafin
    };

    reportesModel.getReporteAccesoFecha(empresa,Data, function (error,data) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.send({
                title:"Reporte de Acceso a Plataforma por Fecha",
                msg:true,
                info:data,
                cantidad: data.length
            });
        }
    })
}