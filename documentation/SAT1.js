/**
 * @api {post}/sat Conexion del SAT 1
 * @apiName SAT
 * @apiGroup SAT
 * 
 * @apiHeader Content-Type=application/json
 * 
 * @apiParam {string} transfer Codigo de Transferencia
 * @apiParam {string} unit Codigo de Unidad
 * @apiParam {string} driver Codigo de Conductor
 * @apiParam {string} origin Codigo de Origen
 * @apiParam {string} destiny Codigo de Destino
 * @apiParam {Date} arrival_date Fecha de llegada al destino, formato: 'YYYY-MM-DD'
 * @apiParam {Time} arrival_time Tiempo de llegada al destino, formato: 'HH:mm:ss'
 * @apiParam {Date} return_date Fecha de retorno desde el destino, formato: 'YYYY-MM-DD'
 * @apiParam {Time} return_time Tiempo de retorno desde el destino, formato: 'HH:mm:ss'
 * 
 * @apiSuccessExample {JSON} Respuesta:
 * HTTP/1.1 200 OK
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 */