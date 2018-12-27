/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {get}/listaEventos Listar Eventos
 * @apiName listaEventos
 * @apiGroup Eventos
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "title": "Listado Eventos",
  "info": [
    {
      "PK_EventoId": 1,
      "Nombre": "Encendido"
    },
    {
      "PK_EventoId": 2,
      "Nombre": "Apagado"
    }
  ]
}
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * error
 * */

/**
 * @api {get}/eventos/all?fecha=[fechaInicio]&fechafin=[fechaFinal] Obtener Todos los Eventos de las Unidades de una Empresa
 * @apiName getAllEventos
 * @apiGroup Eventos
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Datetime} fecha Fecha y hora de inicio como rango de busqueda de Eventos
 * @apiParam {Datetime} fechafin Fecha y hora final como rango de busqueda de Eventos
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Number} cantidad Devuelve el numero de regristros consultados
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "title": "Listado Eventos",
  "cantidad": 2,
  "info": [
    {
      "vehiculo": "[nombre vehiculo]",
      "FechaHora": "[fechahora]",
      "Latitud": [latitud],
      "Longitud": [longitud],
      "Velocidad": [velocidad],
      "Direccion": [direccion],
      "imei": [imei],
      "Entradas": [entradas],
      "nombre": "[nombre evento]"
    },
    {
      "vehiculo": "[nombre vehiculo]",
      "FechaHora": "[fechahora]",
      "Latitud": [latitud],
      "Longitud": [longitud],
      "Velocidad": [velocidad],
      "Direccion": [direccion],
      "imei": [imei],
      "Entradas": [entradas],
      "nombre": "[nombre evento]"
    }
  ]
}
 *
 * @apiError {Number} status Devuelve un numero del error ocurrido en la consulta
 * @apiError {String} msg Devuelve un mensaje cuando ocurre un error con la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "status": 500,
 *      "msg": "error"
 * }
 * */