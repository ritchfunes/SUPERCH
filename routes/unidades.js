/**
 * Created by Walter Suazo on 10/07/2015.
 */

var express = require('express');
var unidadesModel = require('../models/Unidades');
var moment = require('moment');
require('pmx').init({
  http : true
});
var pmx   = require('pmx');
var probe = pmx.probe();
var histogram = probe.histogram({
  name        : 'latency',
  measurement : 'mean'
});
moment.locale('es',{
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



exports.getAll= function(req,res,next){
    if (req.empresa == 'undefined')
    {
        res.render('error');

        return;
    }
    else{
        var data= req.empresa;
    }
    var d1 = Date.now();

    unidadesModel.getUltimasPosiciones(data,function(error,data){
      histogram.update(Date.now() - d1);
        if (error)
        {
            res.send({msg:false});
        } else
        {

            res.send({
                msg:true,
                title : "Listado Unidades",
                info : data
            });
        }
    });

}

exports.getlimiteVelocidad= function(req,res)
{
  emp=req.empresa;
  unidadesModel.limiteVelocidad(emp,function(error,data){

    if (error)
    {
      res.send({msg:false})

    }else
    {
      res.send({
        msg:true,
        info:data,

        cantidad:data.length
      })
    }
  });
}

exports.getlimiteVelocidadDetalle= function(req,res)
{
  unidadesModel.limiteVelocidadAll(emp,function(error,data){

    if (error)
    {
      res.send({msg:false})

    }else
    {
      for(i=0; i <data.length; i++){
        geo=JSON.parse(data[i].Geocerca);
        data[i]['Geocerca']=geo.properties.Nombre;
      }

      res.send({
        msg:true,
        info:data,
        cantidad:data.length
      })
    }
  });
}

exports.getDetenidos=function(req,res)
{
  emp = req.empresa
  unidadesModel.getDetenidos(emp,function (error,data)

   {
    if (error)
    {
      res.send({msg:false})

    }else
      {
          for(idx in data){
              var row = data[idx];
              row['link'] = stringGeocode(row.Longitud,row.Latitud,row.Ubicacion);
          }
          res.send({
              msg: true,
              info: data,
              cantidad: data.length
          });
      }
  })
}

// Ruta para agregar barcode a la unidad, indexada por imei
exports.SetBarcode=function(req,res)
{
    imei= req.body.imei;
    barcode = req.body.barcode;
    placa= req.body.placa;
    data= {Barcode:barcode}
    if(typeof placa !== "undefined")
    {
      data['Nombre_Vehiculo']=placa
    }
    unidadesModel.Update(data,imei, function (err,data) {
      if(err){
        console.log(err);
        res.send({err:1});
      }else{
        res.send({result:'ok',info:data});
      }
    });
}

exports.Update= function(req,res)
{
    imei = req.body.imei;
    conductor  = req.body.conductor;
    vehiculo = req.body.vehiculo;
    icono = req.body.icono;

    data =
    {

        FK_ConductoresId:conductor,
        Nombre_Vehiculo:vehiculo,
        FK_IconoId:icono
    }
    unidadesModel.Update(data,imei,function(err,data){
        if(err){
            console.log(err);
            res.send({err:1});
        }else{
            res.send({result:'ok',info:data});
        }

    });
}

exports.post=function(req,res)
{
  fecha = moment.utc().format();
  conductor=req.body.conductor;
  data=
  {
    imei:req.body.imei,
    FK_ModeloId:req.body.modelo,
    Nombre_Vehiculo:req.body.nombre,
    Activo:req.body.activo,
    FK_IconoId:req.body.icono,
    FechaCreacion:fecha ,
    FK_ConductoresId:conductor
  }
  unidadesModel.crear(data,function(err,data){
    if(err)
    {
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }
  });
}

exports.delete=function(req,res){
  id=req.body.id;
  unidadesModel.delete(id,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }

  });

}

exports.getConductores=function(req,res){
    if(typeof  req.empresa==='undefined'){
        res.sendStatus(400);
    }else{
        empresa=req.empresa;
        unidadesModel.getConductores(empresa,function(error,data){
            if(error){
                console.log(error);
                res.sendStatus(500);
            }else{
                res.send({
                    title:"Conductores",
                    info:data
                });
            }
        });
    }
}

exports.getUnitsNoReport= function (req,res) {
    unidadesModel.unidadesSinReportar(function (error,data) {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.send({
                title: "Listado unidades sin reportar",
                msg:true,
                info: data,
                cantidad: data.length
            });
        }
    })
};


exports.excesosMayor75 = function(req,res){
  unidadesModel.getMayores75(req.empresa,function(error,data){
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }else{
      res.send({
        title:"Excesos mayores a 75",
        msg:true,
        info:data,
        cantidad:data.length
      });
    }
  })
}

function stringGeocode(lon,lat,ubicacion){


    //var linkUbicacion = "<a ng-href='http://maps.google.com/maps?q="+lat+","+lon
      //  +"&ll="+lat+","+lon+"&z=16' target='_blank'>"+ubicacion+"</a>";
    var linkUbicacion = "http://maps.google.com/maps?q="+lat+","+lon
        +"&ll="+lat+","+lon+"&z=16";

    return linkUbicacion;
};

exports.getCH= function (req,res) {
    unidadesModel.getUnidadesCH(function (error,data) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                title: "Lista Unidades CH",
                msg:true,
                cantidad: data.length,
                info: data
            });
        }
    });
};

exports.getListaUnidadesPorEmpresa = function (req,res) {
    unidadesModel.listaUnidadesPorEmpresa(function (error,result) {
        if(error){
            res.sendStatus(500);
        }else{
            res.status(200).send({
                title: "Lista de unidades por empresa",
                msg: true,
                cantidad: result.length,
                info: result
            });
        }
    });
};