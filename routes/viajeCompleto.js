/**
 * Created by Jeffry Romero on 2016-11-14.
 */
var express=require('express');
var viajesModel=require('../models/ViajeCompleto');

exports.listar= function (req,res) {
    viajesModel.get(function (error,data) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                title:"Lista de Viajes Completos",
                msg:true,
                cantidad: data.length,
                info: data
            });
        }
    });
};

exports.viajes = function(req,res)
{
    var _token = req.query.t
    var info = servicio.desencriptar(_token)
    console.log(info)
    now = moment().unix();
    //x console.log(now)
    if (info.ini> now){

        res.render('timeout', {texto:JSON.stringify('Aun no tiene Acceso')});
    }else if ( info.exp< now)
    {
        res.render('timeout', {texto:JSON.stringify('Se vencio el Acceso')});
    }else
    {
        res.render('progreso_viaje', {token:JSON.stringify(_token)});
    }

}