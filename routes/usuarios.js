 /**
 * Created by Walter Suazo on 18/01/2016.
 */
var express = require('express');
var servicio = require("../bin/servicios");
var router = express.Router();
var userModel = require('../models/Usuarios');
var moment = require('moment');
var mailer = require('./mailer');

/* GET users listing. */

router.getUsuarios=( function(req, res) {
    empresaId = req.query.empresaId;
    console.log('-.-');
    console.log(req.query);
    userModel.get(empresaId,function(error,data){
        if(error)
        {
            console.log(error);
            res.sendStatus(500);

        }else
        {
            res.send(data);
        }
    })
});

router.getAcceso = function(req,res){
    data = req.body;
    var a = servicio.createTokentemporal(data);
    res.send({
        token:a
    });

}

router.getAccesoVisita=function(req,res)
{
  var inicio=req.body.inicio;
  var fin = req.body.fin;
  var unidad = req.body.unidad;
  var Nombre = req.body.empresa;
  var Mail=req.body.correo;
  var Invitado = req.body.invitado;

  data =
  {
    ini:inicio,
    fin:fin,
    unidad:unidad,
    empresa:Nombre
  }
  var token = servicio.createTokenvisita(data);
  info = {
    mail:Mail,
    token:token,
    empresa:Nombre
  }
  mailer.mail(info,function(err,data){
    if(err)
    {
      res.send({msg:false})
    }    else
    {
      res.send({msg:true})
    }

  })


}

router.getAccesoSeguimiento = function(req,res)
{

    var unidad = req.body.unidad;
    var empresa = req.body.empresa;

    data = {
        ini: moment().add(0/*-12 para probar en server de prueba*/, "hours").format('YYYY-MM-DD HH:mm:ss').toString(),
        fin:moment().add(12, "hours").format('YYYY-MM-DD HH:mm:ss').toString(),
        unidad:unidad,
        empresa:empresa
    }
    //console.log(data)
    var token = servicio.createTokenvisita(data);
    res.send({token:token});
}

router.invitado = function(req,res)
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
      res.render('invitado', {token:JSON.stringify(_token)});
    }

}

module.exports = router;
