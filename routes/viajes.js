/**
 * Created by Walter Suazo on 17/11/2016.
 */
var express = require('express');
var router = express.Router();
var viajesModel = require('../models/Viajes');


router.getViajes= function(req, res) {
  empresaId = req.empresa;
  viajesModel.get(empresaId,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
};

router.getfinalizados = function (req,res) {
  empresaId = req.empresa;
  viajesModel.getfinalizados(empresaId,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
}

router.getparadas = function (req,res) {
  var imei = req.query.imei;
  var inicio= req.query.inicio;
  viajesModel.getparadas(imei,inicio,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
}

router.getvelocidades = function (req,res) {
  var imei = req.query.imei;
  var inicio= req.query.inicio;
  viajesModel.getvelocidades(imei,inicio,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
}

router.geteventos = function (req,res) {
  var imei = req.query.imei;
  var inicio= req.query.inicio;
  viajesModel.geteventos(imei,inicio,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
}

router.getexcesos=function (req,res) {
  var imei = req.query.imei;
  var inicio= req.query.inicio;
  viajesModel.getExcesos(imei,inicio,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })

}

router.getunidadescd=function (req,res) {
  var empresa = req.empresa;
  viajesModel.getUnidadesCD(empresa,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })

}



router.cancelar = function (req,res) {
  var transferencia = {
    codigo: req.body.transferencia,
    observacion: req.body.observacion,
    estado: req.body.estado
  };

  viajesModel.cancelar(transferencia,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
};

router.uniSinTransf = function (req,res) {
  var empresa = req.empresa;
  viajesModel.getUniSinTransf(empresa,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  })
};

router.tiemposViajes = function (req,res) {
  var transferencia = req.query.transferenciaId;
  //console.log(req.query);
  //console.log(req.body);

  viajesModel.getTiemposViaje(transferencia,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);

    }else
    {
      res.send(data);
    }
  });
};

module.exports=router;
