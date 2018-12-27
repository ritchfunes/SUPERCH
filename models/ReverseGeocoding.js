/**
 * Created by Walter Suazo on 29/07/2015.
 */
db=require("./ConexionMongo");

geocode ={}

geocode.getPos=function(empresa,coordenadas,callback) {
  console.log(coordenadas);

  db.collection().aggregate([
      {
        "$geoNear": {
        "near": {"type": "Point","coordinates": [coordenadas[1],coordenadas[0]]},
        "distanceField": "dis",
        "spherical": true,
          "limit":1
      }
    }
  ],function(err,data){
      if (err){
        callback(err,null);
        console.log(err);
      }else
      {
        data.toArray(function(error, docs){
          if (error){
            console.log(error);
            callback(err, null);
          }else{
            callback(null,docs);
          }
        });
      }
    });
    /*db.dbTest.open(function (error, client) {
        if (error) throw error;
        client.command({
            geoNear: "Lugares",
            near: {type: "Point", coordinates: [coordenadas[1],coordenadas[0]]},
            spherical: true,
            limit: 1,
            query:{$or:[{'properties.empresa':undefined },{'properties.empresa':empresa}]}

        }, function (err, result) {

            callback(result);
        });
    });*/
}
module.exports=geocode;
