/**
 * Created by Jeffry on 11/04/2016.
 */
/**
 * @api {get}/bitacoras/sesion Ultima Sesion Registrada
 * @apiName bitacoraSesion
 * @apiGroup Bitacora
 *
 * @apiParam {Number} user Id de usuario
 *
 * @apiSuccess {String} fecha Devuelve una cadena de caracteres con la fecha de la ultima sesion del usuario registrada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "fecha": "2016-04-12 01:44:50"
}
 *
 * @apiError {String} fecha Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
  "fecha": "no se cuando"
}
 * */

/**
 * @api {get}/bitacoras/eventos Ultimos Eventos Registrados
 * @apiName bitacoraEventos
 * @apiGroup Bitacora
 *
 * @apiParam {Number} user Id de usuario
 *
 * @apiSuccess {String} mensaje Devuelve el mensaje resultante del ultimo evento registrado
 * @apiSuccess {String} fecha Devuelve una cadena de caracteres con la fecha del ultimo evento del usuario registrado
 * @apiSuccess {String} respuesta Devuelve la respuesta optenida de la ejecucion del ultimo evento registrado
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "data": [
    {
      "mensaje": "{\"vehiculo\":\"Ejemplo\",\"imei\":[numero imei],\"comando\":\"Apagar\"}",
      "fecha": "2016-04-12 02:10:06",
      "respuesta": null
    },
    {
      "mensaje": "{\"vehiculo\":\"Ejemplo\",\"imei\":[numero imei],\"comando\":\"Abrir Llavines\"}",
      "fecha": "2016-04-12 02:04:44",
      "respuesta": OK
    }
  ]
}
 *
 * @apiError {String} data Devuelve nada cuando ocurre un error en la consulta
 * @apiErrorExample Respuesta-Error:
 * {
  "data": ""
}
 * */