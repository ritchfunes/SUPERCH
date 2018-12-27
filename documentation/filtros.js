/**
 * Created by GMG on 12/04/2016.
 */
/**
 * @api {get}/filtros Listar Filtros de Empresa
 * @apiName getFiltros
 * @apiGroup Filtros
 *
 * @apiParam {Number} empresa Id de la empresa
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
  "[nombreFiltro]": [
    {
      "FiltroId": [id],
      "Nombre": "[nombreFiltro]",
      "Correos": "[correosFiltro]",
      "d1": 1,
      "d2": 1,
      "d3": 1,
      "d4": 1,
      "d5": 1,
      "d6": 0,
      "d7": 0,
      "Desde": "[fechaInicio]",
      "Hasta": "[fechaFinal]",
      "PK_GeocercaId": [idGeocerca],
      "Frecuencia": 1,
      "TipoEntrada": 1,
      "TipoSalida": 0,
      "TipoVelocidad": 0,
      "TipoPermanencia": 1,
      "VelocidadMax": [velMaxKm],
      "VelocidadMin": [velMinKm],
      "Tiempo": [minutos],
      "imei": [numeroImei],
      "UnidadId": [idUnidad],
      "Nombre_Vehiculo": "[nombreVehiculo]"
    }
  ]
}
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {post}/filtros Guardar Filtro de Empresa
 * @apiName postFiltro
 * @apiGroup Filtros
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Array} unidades Arreglo con las unidades que estan dentro del filtro
 * @apiParam {Array} geocercas Arreglo con las geocercas del filtro a guardar
 * @apiParam {JSON} filtro Objeto JSON que guarda la informacion del filtro (nombre, correos, tipoVelocidad, tipoPermanencia, tipoEntrada, tipoSalida, d1->d7, desde, hasta, frecuencia, [tiempo], [descripcion], [velocidadMax], [velocidadMin])
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda el filtro correctamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *      "msg": true
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al guardar el filtro
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {delete}/filtros Eliminar Filtro de Empresa
 * @apiName deleteFiltro
 * @apiGroup Filtros
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Number} id Id del filtro a eliminar
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {put}/filtros Modificar Filtro de Empresa
 * @apiName putFiltro
 * @apiGroup Filtros
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Array} unidades Arreglo con las unidades que estan dentro del filtro
 * @apiParam {Array} geocercas Arreglo con las geocercas del filtro a guardar
 * @apiParam {JSON} filtro Objeto JSON que guarda la informacion del filtro (nombre, correos, tipoVelocidad, tipoPermanencia, tipoEntrada, tipoSalida, d1->d7, desde, hasta, frecuencia, [tiempo], [descripcion], [velocidadMax], [velocidadMin])
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda el filtro correctamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
 *      "msg": true
}
 *
 * @apiError {Boolean} msg Devuelve false cuando ocurre algun error al guardar el filtro
 * @apiErrorExample {JSON} Respuesta-Error 1
 * HTTP/1.1 500 Internal Server Error
 *
 * @apiErrorExample {JSON} Respuesta-Error 2
 * {
 *  "msg": false
 * }
 * */
