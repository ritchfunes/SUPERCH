/**
 * Created by Jeffry on 11/04/2016.
 */
/**
 * @api {post}/comandos/posicion Ubicar Posicion de vehiculo
 * @apiName comandoPosicion
 * @apiGroup Comandos
 *
 * @apiParam {Number} user Id de usuario
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {String} vehiculo Contiene el nombre de la marca del vehiculo de la unidad
 *
 * @apiSuccessExample Respuesta-Successs:
 * pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]
 *
 * @apiError {String} data Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "data": "error"
 * }
 * */

/**
 * @api {post}/comandos/llavines Abrir llavines del vehiculo
 * @apiName comandoLlavines
 * @apiGroup Comandos
 *
 * @apiParam {Number} user Id de usuario
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {String} vehiculo Contiene el nombre de la marca del vehiculo de la unidad
 *
 * @apiSuccessExample Respuesta-Successs:
 * FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]
 *
 * @apiError {String} data Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "data": "error"
 * }
 * */

/**
 * @api {post}/comandos/apagar Apagar vehiculo
 * @apiName comandoApagar
 * @apiGroup Comandos
 *
 * @apiParam {Number} user Id de usuario
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {String} vehiculo Contiene el nombre de la marca del vehiculo de la unidad
 *
 * @apiSuccessExample Respuesta-Successs:
 * FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]
 *
 * @apiError {String} data Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "data": "error"
 * }
 * */

/**
 * @api {post}/comandos/habilitar Habilitar vehiculo
 * @apiName comandoHabilitar
 * @apiGroup Comandos
 *
 * @apiParam {Number} user Id de usuario
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {String} vehiculo Contiene el nombre de la marca del vehiculo de la unidad
 *
 * @apiSuccessExample Respuesta-Successs:
 * FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]
 *
 * @apiError {String} data Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "data": "error"
 * }
 * */

/**
 * @api {post}/comandos/otro Otro Comando de unidad
 * @apiName comandoOtro
 * @apiGroup Comandos
 *
 * @apiParam {Number} user Id de usuario
 * @apiParam {Number} imei Imei de la unidad
 * @apiParam {String} vehiculo Contiene el nombre de la marca del vehiculo de la unidad
 * @apiParam {String} comando Comando gps a ejecutarse
 *
 * @apiSuccessExample Respuesta-Successs:
 * FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]
 *
 * @apiError {String} data Devuelve un mensaje cuando hubo algun error con la consulta
 * @apiErrorExample Respuesta-Error:
 * {
 *      "data": "error"
 * }
 * */