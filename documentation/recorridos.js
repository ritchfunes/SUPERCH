/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {get}/recorridos?imei=[numeroImei]&desde=[fechaInicio]&hasta=[fechaFinal] Listar Recorridos
 * @apiName getPuntos
 * @apiGroup Recorridos
 *
 * @apiParam {Number} imei Numero del imei de la unidad
 * @apiParam {Datetime} desde Fecha y hora de inicio como rango de busqueda de recorridos
 * @apiParam {Datetime} hasta Fecha y hora final como rango de busqueda de recorridos
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Number} cantidad Devuelve el numero de registros consultados
 * @apiSuccess {JSON} info Devuelve un objeto de tipo JSON con la informacion de la consulta realizada
 * @apiSuccessExample Respuesta-Success:
 * {
  "title": "Listado Posiciones",
  "cantidad": 2,
  "info": [
    {
      "FechaHora": "[fechahora]",
      "Velocidad": [velocidad],
      "Latitud": [latitud],
      "Longitud": [longitud],
      "Direccion": [direccion]
    },
    {
      "FechaHora": "[fechahora]",
      "Velocidad": [velocidad],
      "Latitud": [latitud],
      "Longitud": [longitud],
      "Direccion": [direccion]
    }
  ]
}
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {post}/recorridosHora Listar Recorridos Ultima Hora
 * @apiName getRecorridosHora
 * @apiGroup Recorridos
 *
 * @apiParam {Array} imei Arreglo con los Imeis de las unidades para buscar el recorrido reciente
 *
 * @apiSuccess {String} title Titulo de la respuesta de la consulta
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccess {JSON} info Devuelve un objeto tipo JSON que contiene arreglos de la informacion agrupada por los Imeis
 * @apiSuccess {Number} cantidad Devuelve la cantidad total de informacion consultada
 * @apiSuccessExample Respuesta-Success:
 * {
  "title": "Recorridos por Hora",
  "msg": true,
  "info": {
    "357666051278718": [
      {
        "Imei": 357666051278718,
        "FechaHora": "2016-04-28 14:52:36",
        "Latitud": 14.04083,
        "Longitud": -87.22888,
        "Velocidad": 0
      }
    ]
  },
  "cantidad": 1
 }
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */