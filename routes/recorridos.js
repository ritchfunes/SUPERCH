/**
 * Created by Walter Suazo on 19/11/2015.
 */
var express = require('express');
var recorridoModel = require('../models/Recorrido');
var moment = require('moment');
var underscore=require('underscore');
moment.locale('es');

exports.getPuntos=function(req,res){
    var imei = req.query.imei;
    var desde = req.query.desde;
    var hasta = req.query.hasta;

    recorridoModel.getPuntos(imei,desde,hasta, function(err,data){
       if(err){
           console.log(err);
           res.sendStatus(500);
       }  else{

           res.send({

               title : "Listado Posiciones",
                   cantidad:data.length,
                   info : data
               }
           );
       }
    });


}

exports.getRecorridosHora= function (req, res) {
    data = {
        imeis:req.body.imei,
        fechaHora:moment().format('YYYY-MM-DD HH:mm:ss')
    }



    recorridoModel.getRecHora(data, function (err,data) {
        if(err){
            res.sendStatus(500);
        }else{
            Data=underscore.groupBy(data,'Imei');

            res.send({title:"Recorridos por Hora",
                msg:true,
                info:Data,
                cantidad:data.length
            });
        }
    });
}