/**
 * Created by Walter Suazo on 10/11/2015.
 */


var express = require('express');
var EventosModel = require('../models/Eventos');
var moment = require('moment');
/*moment.locale('es',{
    relativeTime:{
        s   :'%d S',
        m   :'1 m',
        mm  :'%d m',
        h   :'1 H',
        hh  :'%d H',
        d   :'1 d',
        dd  :'%d d',
        M   :'1 M',
        MM  :'%d M',
        y   :'1 Y',
        yy  :'%d Y'
    }
});
*/

exports.getList= function(req,res){
    EventosModel.getEventos(function(error,data){
        if (error)
        {
            res.render('error');
        } else
        if (typeof data !== 'undefined' &&  data.length >0 )
        {
            res.send({
                title : "Listado Eventos",
                info : data
            });
        }
    });

}

exports.getEvento=function(req,res){
data =
{
    Imei:req.query.imei,
    evento:req.query.evento || 101,
    fecha:req.query.fecha,
    fechafin:req.query.fechafin || moment().format()
}
    EventosModel.getEvento(data,function(error,data)
    {
        if (error)
        {   console.log(error);
            res.render({status:500,msg:'error'});
        } else
        if (typeof data !== 'undefined' )
        {
            res.send({
                title : "Listado Eventos",
                cantidad:data.length,
                info : data

            });
        }
    })
}

exports.getAllEventos=function(req,res){
    data =
    {
        empresa:req.empresa,
        fecha:req.query.fecha || moment().subtract(5, 'hours').format(),
        fechafin:req.query.fechafin || moment().format()
    }
    EventosModel.getAllEventos(data,function(error,data)
    {
        if (error)
        {   console.log(error);
            res.render({status:500,msg:'error'});
        } else
        if (typeof data !== 'undefined' )
        {
            res.send({
                title : "Listado Eventos",
                cantidad:data.length,
                info : data

            });
        }
    })
}

exports.Alerta=function(req,res) {
    data =
    {
        empresa: req.empresa,

    };
    EventosModel.Alertas(data, function (error, data) {
        if (error) {
            console.log(error);
            res.render({status: 500, msg: 'error'});
        } else if (typeof data !== 'undefined') {
            res.send({
                title: "Listado de Alertas",
                msg:true,
                cantidad: data.length,
                info: data

            });
        }
    })
};

exports.detenidos= function (req,res) {
    data =
    {
        empresa: req.empresa,

    };
    EventosModel.Detenidos(data, function (error, data) {
        if (error) {
            console.log(error);
            res.render({status: 500, msg: 'error'});
        } else if (typeof data !== 'undefined') {
            res.send({
                title: "Listado de Detenidos",
                cantidad: data.length,
                info: data,
                msg:true
            });
        }
    })
};

exports.detenidosAutorizados30 = function(req, res){
    EventosModel.DetenidosAutorizados30(req.empresa, function(error, data){
        if(error){
            console.log(error);
            res.send({msg: 'error'}).status(500);
        }else{
            res.send({
                title: 'Listado Detenciones Autorizadas mayores a 30 minutos',
                cantidad: data.length,
                info: data,
                msg: true
            });
        }
    });
}

exports.agregarComentario = function(req, res){
    data = {
        comentario: req.body.Comentario,
        id: req.body.DetenidoId
    }
    EventosModel.agregarComentarioAlerta(data, function(err, resp){
        if(err){
            console.log(err);
            res.status(500).send({msg: 'false'});
        }else{
            res.send({msg: true});
        }
    })
}

exports.sinReportar=function (req,res) {
  data =
    {
      empresa: req.empresa,

    };
  EventosModel.sinReportar(data, function (error, data) {
    if (error) {
      console.log(error);
      res.render({status: 500, msg: 'error'});
    } else if (typeof data !== 'undefined') {
      res.send({
        title: "Listado de unidades Sin Reportar",
        cantidad: data.length,
        info: data,
        msg:true
      });
    }
  })
}

    exports.unidadesSinReportar=function (req,res) {
        data = {
        empresa: req.empresa,

        };
        EventosModel.unidadesSinReportar(data, function (error, data) {
            if (error) {
                console.log(error);
                res.render({status: 500, msg: 'error'});
            } else if (typeof data !== 'undefined') {
                res.send({
                    title: "Listado de unidades",
                    cantidad: data.length,
                    info: data,
                    msg:true
                });
            }
        });
    }
