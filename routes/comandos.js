/**
 * Created by Roberto on 01/10/2015.
 */

var express = require('express');
var net = require('net');
//var HOST = '131.161.52.171';
var HOST = '52.10.4.36';
var PORT = 5999;
var bitacoraModel = require('../models/Bitacora');

var moment = require('moment');

exports.posicion = function(req,res,next) {
    console.log('posicion');
    var vehiculo= req.body.vehiculo;
    var imei = req.body.imei;
    var user = req.user;
    var id;
    var client = net.connect(PORT, HOST,
        function () { //'connect' listener
            console.log('connected to server!');
            client.write(imei + ':Ubicar');
            data =
            {
                idUsuario:user,
                idEvento:2,
                Mensaje:'{"vehiculo":"'+vehiculo+'","imei":'+imei+',"comando":"Ubicar"}',
                fecha:moment.utc().format()
            }
            bitacoraModel.comandoEnviado(data,function(err,resp){
                id = resp.insertId;
            });
        });
    client.on('error',function(e){
        console.log('error conectandose al servidor');
        res.send({data:'error'});
    });
    client.on('data', function (data) {
        console.log(data.toString());

        bitacoraModel.updateComando(id,function(err,data){

        });
        client.end();
        res.send(data.toString());
    });
    client.on('end', function () {
        console.log('disconnected from server');
    });
}

exports.llavines = function(req,res,next){
    console.log('llavines');
    vehiculo= req.body.vehiculo;
        imei = req.body.imei
        user = req.user;
        var id;
        var client = net.connect(PORT,HOST,
            function() {

                console.log('connected to server!');
                client.write(imei+':Abrir Llavines');
                data =
                {
                    idUsuario:user,
                    idEvento:2,
//                    Mensaje:vehiculo+':'+imei+':Abrir Llavines',
                    Mensaje:'{"vehiculo":"'+vehiculo+'","imei":'+imei+',"comando":"Abrir Llavines"}',
                    fecha:moment.utc().format()
                }
                bitacoraModel.comandoEnviado(data,function(err,resp){
                    id = resp.insertId;
                });
            });
    client.on('error',function(e){
        console.log('error conectandose al servidor');
        res.send({data:'error'});
    });
        client.on('data', function(data) {
            console.log(data.toString());
            bitacoraModel.updateComando(id,function(err,data){
            });
            client.end();
            res.send(data.toString());
        });
        client.on('end', function() {
            console.log('disconnected from server');
        });
}

exports.apagar = function(req,res,next){
    //var respuestaComando;
    vehiculo= req.body.vehiculo;
    imei = req.body.imei
    user = req.user;
    var id;
    var client = net.connect(PORT,HOST,
        function() { //'connect' listener
            console.log('connected to server!');
            client.write(imei+':Apagar');
            data =
            {
                idUsuario:user,
                idEvento:2,
//                Mensaje:vehiculo+':'+imei+':Apagar',
                Mensaje:'{"vehiculo":"'+vehiculo+'","imei":'+imei+',"comando":"Apagar"}',
                fecha:moment.utc().format()
            }
            bitacoraModel.comandoEnviado(data,function(err,resp){
                id = resp.insertId;
            });
        });
    client.on('error',function(e){
        console.log('error conectandose al servidor');
        res.send({data:'error'});
    });
    client.on('data', function(data) {
        console.log(data.toString());
        bitacoraModel.updateComando(id,function(err,data){
        });
        client.end();
        res.send(data.toString());
    });
    client.on('end', function() {
        console.log('disconnected from server');
    });
}

exports.habilitar = function(req,res,next){
    vehiculo= req.body.vehiculo;
    imei = req.body.imei;
    user = req.user;
    var id;
    var client = net.connect(PORT,HOST,
        function() { //'connect' listener
            console.log('connected to server!');

            client.write(imei+':Encender');
            data =
            {
                idUsuario:user,
                idEvento:2,
//                Mensaje:vehiculo+':'+imei+':Encender',
                Mensaje:'{"vehiculo":"'+vehiculo+'","imei":'+imei+',"comando":"Habilitar"}',
                fecha:moment.utc().format()
            }
            bitacoraModel.comandoEnviado(data,function(err,resp){
                id = resp.insertId;
            });
        });
    client.on('error',function(e){
        console.log('error conectandose al servidor');
        res.send({data:'error'});
    });
    client.on('data', function(data) {
        console.log(data.toString());
        bitacoraModel.updateComando(id,function(err,data){
        });
        client.end();
        res.send(data.toString());
    });
    client.on('end', function() {
        console.log('disconnected from server');
    });
};

exports.otro = function(req,res,next){
    //var respuestaComando;
    vehiculo= req.body.vehiculo;
    user = req.user;
    var comando = req.body.comando;
    imei = req.body.imei
    var client = net.connect(PORT,HOST,
        function() { //'connect' listener
            console.log('connected to server!');
            client.write(imei+':'+ comando);
            data =
            {
                idUsuario:user,
                idEvento:2,
               // Mensaje:vehiculo+':'+imei+':'+comando,
                Mensaje:'{"vehiculo":"'+vehiculo+'","imei":'+imei+',"comando":"'+comando+'"}',
                fecha:moment.utc().format()
            }
            bitacoraModel.comandoEnviado(data,function(err,resp){
                id = resp.insertId;
            });
        });
    client.on('error',function(e){
        console.log('error conectandose al servidor');
        res.send({data:'error'});
    });
    client.on('data', function(data) {
        console.log(data.toString());
        bitacoraModel.updateComando(id,function(err,data){
        });
        client.end();
        res.send(data.toString());
    });
    client.on('end', function() {
        console.log('disconnected from server');
    });
}
