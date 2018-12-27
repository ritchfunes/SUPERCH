/**
 * Created by Walter Suazo on 01/12/2015.
 */
var express = require('express');
var filtrosModel = require('../models/Filtros');
var async = require('async');
var under = require('underscore');
var moment = require('moment');

exports.get= function (req,res) {
  empresa = req.empresa;
  filtrosModel.getFiltros(empresa,function(error,data){
    if(error){
      console.log(error);
      res.sendStatus(500);
    }else
    {
      data=(under.groupBy(data,'Nombre'))
      res.send(data);
    }
  });
};


/*agregar el request de unidades y geocercas*/
exports.post= function (req,res) {
  filtro=req.body.filtro;
  unidades=req.body.unidades;
  geocercas=req.body.geocercas;

  data= {
    FK_empresaId: req.empresa,
    Nombre: filtro.nombre,
    Correos:filtro.correos,
    TipoVelocidad:filtro.tipoVelocidad,
    TipoPermanencia:filtro.tipoPermanencia,
    TipoEntrada:filtro.tipoEntrada,
    TipoSalida:filtro.tipoSalida,
    d1: filtro.d1,
    d2: filtro.d2,
    d3: filtro.d3,
    d4: filtro.d4,
    d5: filtro.d5,
    d6: filtro.d6,
    d7: filtro.d7,
    HoraDesde: filtro.desde,
    HoraHasta: filtro.hasta,
    Frecuencia:filtro.frecuencia
  };

  if(typeof filtro.tiempo === "undefined"){}else
  {
    data['Tiempo']=filtro.tiempo;
  }
  if(typeof filtro.descripcion === "undefined"){}else
  {
    data['Descripcion']=filtro.descripcion;
  }
  if(typeof filtro.velocidadMax === "undefined"){}else
  {
    data['VelocidadMax']=filtro.velocidadMax;
  }
  if(typeof filtro.velocidadMin === "undefined"){}else
  {
    data['VelocidadMin']=filtro.velocidadMin;
  }

  console.log(data)

  filtrosModel.CreateFiltro(data,function(error,data)
  {
    if(error)
    {
      console.log(error);
      res.send({msg:false});
    }else
    {

    id=data.insertId;
    datageo=joinValues(id,geocercas);
    datauni=joinValues(id,unidades)
    async.parallel([
      function(callback)
      {
         filtrosModel.GeoFiltro(datageo,function(err,data){
               if(err) return callback(err);
                callback();
        });
      },
      function(callback){
        filtrosModel.UniFiltro(datauni,function(err,data){
          if(err)return callback(err);
          callback();
        });
      }
    ],function(err){
      if(err){
        console.log(err)
        res.send({msg:false})
      }else
      {
        res.send({msg:true})
      }

    });
    }
  });
};

 function joinValues(id,arreglo)
 {

   d=[];
   for(valor in arreglo)
   {
     d[valor]= "("+id+","+arreglo[valor] +")"
   }
   d=d.join();
  return d
 }

exports.delete= function (req,res) {
  empresa = req.empresa;
  id = req.body.id;
  filtrosModel.DeleteFiltros(id,function(error,data){
    if(error)
    {
      console.log(error);
      res.sendStatus(500);
    }else
    {
      res.sendStatus(200);
    }

  });
};

function deletingValues(idFiltro,deletes,estado) {
  d = [];
  i = 0;
  if (estado) {
    for (value in deletes) {
      if (deletes[value].estado) {
        d[i] = "(" + idFiltro + "," + deletes[value].id + ")";
        i++;
      }
    }
  }
  else {
    for (value in deletes) {
      if (!deletes[value].estado) {
        d[i] = "(" + idFiltro + "," + deletes[value].id + ")";
        i++;
      }
    }
  }

  d= d.join();
  return d;
}

exports.put= function (req,res) {
  empresa = req.empresa;
  id = req.body.id;
  data = {};
  unidades=[];
  deleteUnidades=[];
  geocercas=[];
  deleteGeocercas=[];
  data['empresa']=req.empresa;

  if(typeof req.body.nombre=== "undefined"){
    data['nombre']=null;
  }else
  {
    data['nombre']=req.body.nombre;
  }

  if(typeof req.body.descripcion==="undefined"){
    data['Descripcion']=null;
  }else
  {
    data['Descripcion']=req.body.descripcion;
  }

  if(typeof req.body.correos==="undefined"){
    data['Correos']=null;
  }else
  {
    data['Correos']=req.body.correos;
  }

  if(typeof req.body.tipoPermanencia=== "undefined"){
    data['TipoPermanencia']=null;
  }else
  {
    data['TipoPermanencia']=req.body.tipoPermanencia;
  }

  if(typeof req.body.tipoVelocidad=== "undefined"){
    data['TipoVelocidad']=null;
  }else
  {
    data['TipoVelocidad']=req.body.tipoVelocidad;
  }

  if(typeof req.body.tipoEntrada=== "undefined"){
    data['TipoEntrada']=null;
  }else
  {
    data['TipoEntrada']=req.body.tipoEntrada;
  }

  if(typeof req.body.tipoSalida=== "undefined"){
    data['TipoSalida']=null;
  }else
  {
    data['TipoSalida']=req.body.tipoSalida;
  }

  if(typeof req.body.d1 === "undefined"){
    data['d1']=null
  }else
  {
    data['d1']=req.body.d1;
  }

  if(typeof req.body.d2=== "undefined"){
    data['d2']=null;
  }else
  {
    data['d2']=req.body.d2;
  }

  if(typeof req.body.d3=== "undefined"){
    data['d3']=null;
  }else
  {
    data['d3']=req.body.d3;
  }

  if(typeof req.body.d4 === "undefined"){
    data['d4']=null;
  }else
    {
      data['d4']=req.body.d4;
    }

  if(typeof req.body.d5 === "undefined"){
    data['d5']=null;
  }else
    {
      data['d5']=req.body.d5;
    }

  if(typeof req.body.d6=== "undefined"){
    data['d6']=null;
  }else
    {
      data['d6']=req.body.d6;
    }

  if(typeof req.body.d7 === "undefined"){
    data['d7']=null;
  }
  else
    {
      data['d7']=req.body.d7;
    }

  if(typeof req.body.desde=== "undefined"){
    data['HoraDesde']=null;
  }else
  {
    data['HoraDesde']=moment(req.body.desde).format('YYYY-MM-DD HH:mm:ss');
  }

  if(typeof req.body.hasta=== "undefined"){
    data['HoraHasta']=null;
  }else
  {
    data['HoraHasta']=moment(req.body.hasta).format('YYYY-MM-DD HH:mm:ss');
  }

  if(typeof req.body.tiempo=== "undefined"){
    data['Tiempo']=null;
  }else
  {
    data['Tiempo']=req.body.tiempo;
  }

  if(typeof req.body.velocidadMax=== "undefined"){
    data['VelocidadMax']=60;
  }else
  {
    data['VelocidadMax']=req.body.velocidadMax;
  }

  if(typeof req.body.velocidadMin=== "undefined"){
    data['VelocidadMin']=0;
  }else
  {
    data['VelocidadMin']=req.body.velocidadMin;
  }

  if(typeof req.body.frecuencia==="undefined"){
    data['Frecuencia']=null;
  }else
  {
    data['Frecuencia']=req.body.frecuencia;
  }

  if(typeof req.body.unidades==="undefined"){
    data['unidades']=null;
    data['deleteUnidades']=null;
  }else
  {
    data['unidades']=deletingValues(id,req.body.unidades,true);
    data['deleteUnidades']=deletingValues(id,req.body.unidades,false);
    console.log("Unit "+data.unidades);
  }

  if(typeof req.body.geocercas==="undefined"){
    data['geocercas']=null;
    data['deleteGeocercas']=null;
  }else
  {
    data['geocercas']=deletingValues(id,req.body.geocercas,true);
    data['deleteGeocercas']=deletingValues(id, req.body.geocercas,false);
    console.log("Geo "+ data.deleteGeocercas);
  }

  if(Object.keys(data).length<1 || !req.body.id) {
      res.sendStatus(400);

  }else
  {
    filtrosModel.UpdateFiltros(id,data,function(error,datos){
      if(error){
        console.log(error);
        res.sendStatus(500);
      }else
      {
      /*
        //res.sendStatus(200);
        async.parallel([
            function (callback){
              if(typeof unidades[0]==="undefined"){
                console.log("callback")
                callback();
              }else if(!(typeof unidades[0]==="undefined")){
                filtrosModel.UniFiltro(unidades,function(err,data){
                  if(err) return callback("Insert Uni "+err);
                  callback();
                });
              }
            },
            function(callback){
              if(typeof deleteUnidades[0]==="undefined"){
                console.log("callback")
                callback();
              }else if(!(typeof deleteUnidades[0]==="undefined")){
                filtrosModel.deleteUnidades(deleteUnidades,callback,function(err2,data2){
                  if(err2) return callback("delete Uni "+err2);
                  callback();
                });
              }
            },
          function (callback){
            if(typeof geocercas[0]==="undefined"){
              console.log("callback")
              callback();
            }else if(!(typeof geocercas[0]==="undefined")){
              filtrosModel.GeoFiltro(geocercas,function(err,data){
                if(err) return callback("Insert Geo "+err);
                callback();
              });
            }
          },
          function(callback){
            if(typeof deleteGeocercas[0]==="undefined"){
              console.log("callback")
              callback();
            }else if(!(typeof deleteGeocercas[0]==="undefined")){
              filtrosModel.deleteGeocercas(deleteGeocercas,callback,function(err2,data2){
                if(err2) return callback("delete Geo "+err2);
                callback();
              });
            }
          }

        ],function(err){
          if(err){
            console.log("ASYNC"+err)
            res.send({msg:false})
          }else{
            res.send({msg:true})
          }
        });*/
        res.status(200).send({msg:true,info:datos});
      }
    });

  }

};
