/**
 * Created by GMG on 20/04/2016.
 */
/**
 * @api {get}/reportAcceso Reporte de Acceso a la Plataforma
 * @apiName getReporteAccesso
 * @apiGroup Reportes
 *
 * @apiParam {Number} empresa Id de la empresa
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta de la consulta
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realiza exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con objetos tipo JSON que contienen la informacion consultada
 * @apiSuccess {Number} cantidad Cantidad de informacion consultada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "title": "Reporte de Acceso a Plataforma",
  "msg": true,
  "info": [
    {
      "IdUsuario": [IdUsuario],
      "Usuario": "[Usuario]",
      "fecha": "2016-04-20 20:09:29",
      "CantidadAcceso": 3
    }
  ],
  "cantidad": 1
}
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/reportAccFecha?fechainicio=[fechaInicio]&fechafin=[fechaFin] Reporte de Acceso por Fecha a la Plataforma
 * @apiName getReporteAccFecha
 * @apiGroup Reportes
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Datetime} fechainicio Fecha de inicio a buscar en el Reporte. NOTA: La Fecha de Inicio NO debe ser Mayor que la Fecha Final (fechafin)
 * @apiParam {Datetime} fechafin Fecha final del rango a buscar en el Reporte. NOTA: La Fecha Final NO debe ser Menor que la Fecha de Inicio (fechainicio)
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta de la consulta
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realiza exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con objetos tipo JSON que contienen la informacion consultada
 * @apiSuccess {Number} cantidad Cantidad de informacion consultada
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "title": "Reporte de Acceso a Plataforma por Fecha",
  "msg": true,
  "info": [
    {
      "IdUsuario": [IdUsuario],
      "Usuario": "[Usuario]",
      "fecha": "2016-04-20 20:09:29",
      "CantidadAcceso": 3
    }
  ],
  "cantidad": 1
}
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */