/**
 * Created by GMG on 06/06/2016.
 */
var express = require('express');
var paradasModel = require('../models/Paradas');

exports.crearParada= function (req, res) {
    paradasAut=req.body;
    //refIds=[];
    data=[];
    for(ref in paradasAut){
        //console.log(JSON.stringify(paradasAut[ref]));
        data[ref]="("+paradasAut[ref]['referencias']+","+paradasAut[ref]['radio']+")";
        //refIds[ref]=paradasAut[ref]['referencias'];
    }
    data=data.join();
    /*for(i=0;i<req.body.length;i++){
      data.push("("+parseInt(req.body[i].referencias)+","+req.body[i].radio+")");
    }*/

    if(data){
        console.log(data);
        paradasModel.Insert(data, function (err, Data) {
            if(err){
                res.sendStatus(500);
            }else{
                res.send({
                    title: "Parada creada!",
                    msg: true
                });
            }
        })
    }
};

exports.putParada= function (req,res) {
    id=req.body.id;
    data={
        FK_ReferenciaId: req.body.referencias,
        Radio: req.body.radio
    };

    paradasModel.Update(data,id, function (err,Data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            res.send({
                title: "Parada actualizada!",
                msg: true
            });
        }
    })
};


exports.getParadas= function (req,res) {
    empresa=req.empresa;
    paradasModel.Get(empresa, function (err,data) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            res.send({
                title:"Listado Paradas Autorizadas",
                msg:true,
                info:data,
                cantidad:data.length
            });
        }
    });
};

exports.deleteParada= function (req,res) {
    id=req.query.id;
    paradasModel.Delete(id, function (error,data) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.send({msg: true});
        }
    })
};

exports.getNoAutorizadas= function (req,res) {
    empresa=req.empresa;
    paradasModel.GetParadasNoAutorizadas(empresa,function(error,data){
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else {
            res.send({
                title:"Listado Paradas No Autorizadas",
                msg:true,
                info:data,
                cantidad:data.length
            });
        }
    });
};
