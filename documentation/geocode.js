/**
 * Created by GMG on 11/04/2016.
 */
/**
 * @api {get}/geocoder?lat=00.00&lon=-00.00 Obtener Geocodigo
 * @apiName getGeocoder
 * @apiGroup Geocode
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Number} lat Parametro de la Latitud
 * @apiParam {Number} lon Parametro de la Longitud
 *
 * @apiSuccess {Number} dis Devuelve el valor de distancia
 * @apiSuccess {JSON} obj Devuelve el punto de referencia y sus propiedades
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "dis": 00.000,
        "obj": {
            "_id": "ej3mpl0",
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    00.00,
                    00.00
                ]
            },
            "properties": {
                "empresa": 1,
                "nombre": "ejemplo",
                "Descripcion": "ejemplo de empresa"
            }
        }
}
 * */