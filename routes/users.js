var express = require('express');
var servicio = require("../bin/servicios");
var router = express.Router();
var userModel = require('../models/Users');
var moment = require('moment');
/* GET users listing. */

router.get=( function(req, res) {
 empresa = req.empresa;
 console.log(empresa);
 userModel.get(empresa,function(error,data){
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


router.crear=function(req,res){
    var user = req.body.user;
    var pass = req.body.pass;
     empresa = req.body.empresa;
    var rol = req.body.rol;
   // var vigencia =req.body.vigencia;
    data =
    {
      FK_EmpresasId:empresa,
      Usuario:user,
      Clave:servicio.encriptar(pass),
      FK_RolesId:rol,
      Vigencia:moment().add(3,'months').format("YYYY-MM-DD")

    }

    userModel.addUser(data,function(error,data){
      if(error){
       console.log(error);
        res.send(error);
      }else
       {
        res.send( { title: 'Crear Usuario',info:user + ' creado'  } );
      }

    });
  }


router.reset= function (req,res) {
  var pass= req.body.pass;
  var user = req.user;
  var oldpass= req.body.opass;


  if (typeof pass === "undefined")
  {
    res.send({msg:false,info:'parametro pass no encontrado'})
  }else
  if(typeof oldpass === "undefined")
  {
    res.send({msg:false,info:'parametro old_pass no encontrado'})
  }else
  {
    clave= servicio.encriptar(pass);
    oldpass=servicio.encriptar(oldpass);
    data={

      Clave:clave,
      ClaveTemporal:pass

    }
    userModel.reset(user,oldpass,data,function(err,data){
      if(err)
      {
        res.send({msg:false})
      }else
      {

        if (data.affectedRows ==1){
          res.send({msg:true})
        }else
        {
          res.send({msg:false, info:'La clave anterior no corresponde al usuario actual'})
        }

      }
    })
  }




}

router.put=function(req,res){
  data={}
  var id =req.body.id;
  if(typeof req.body.user==="undefined") {}else
  {
    data['Usuario']=req.body.user;
  }
  if(typeof req.body.pass==="undefined"){}else
  {
    data['Clave']=servicio.encriptar(req.body.pass);
  }
  if(typeof req.body.empresa ==="undefined"){}else
  {
    data['FK_EmpresaId']=req.body.empresa;
  }
  if(typeof req.body.rol ==="undefined"){}else
  {
    data['FK_RolesId']=req.body.rol;
  }
  if(typeof req.body.vigencia ==="undefined"){}else
  {
    data['Vigencia']=req.body.vigencia;
  }

  userModel.put(id,data,function(err,data){
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }
  });



}



module.exports = router;
