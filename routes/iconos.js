/**
 * Created by Walter Suazo on 13/11/2015.
 */

var express = require('express');
var iconModel = require('../models/Iconos');

exports.add = function (req, res) {
    url = req.body.url
    data= {
        url:url
    }
    iconModel.add(data, function (err,data) {
        if(err){
            console.log(err);
            res.send({err:-1});
        }else
        {
            res.send({info:data});
        }
    });
}

exports.get = function (req, res) {
    console.log('iconos')
    if (req.query.id){
        id= req.query.id;
        data = 'where PK_UnidadesIconoId= '+id;
    }else
    {
        data = "";
    }

    iconModel.get(data,function (err,dat) {
        if(err){
            console.log(err);
            res.send({err:-1});
        }else
        {
            res.send({title:"Iconos",info:dat});
        }
    });
}
