/**
 * Created by Walter Suazo on 29/07/2015.
 */
var express = require('express');

var geocode = require('../models/ReverseGeocoding');


exports.init=function(req,res,next){
    lon=parseFloat(req.query.lat);
    lat=parseFloat(req.query.lon);

    empresa =req.empresa||parseInt(req.query.empresa);
    coordenadas = [lon,lat];


    geocode.getPos(empresa,coordenadas,function(err,result){
      var resultado={};

        if (err)
        {
          console.log(err);
          resultado="";
        }else {
          var tmpresultado = result[0];
          console.log(tmpresultado);
          resultado['dis']=tmpresultado['dis']
          var obj={}
          obj['gemetry'] = tmpresultado['geometry']
          obj['properties']=tmpresultado['properties']
          resultado['obj']=obj
        }
      res.send(resultado);
});
}
