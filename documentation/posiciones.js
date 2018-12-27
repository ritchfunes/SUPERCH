/**
 * Created by GMG on 11/04/2016.
 */
/**
 * @api {get}/posiciones?imei=[numero_imei] Listar Posiciones
 * @apiName listarPosiciones
 * @apiGroup Posiciones
 *
 * @apiHeader {Number} imei Imei de la unidad
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion consultada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "title": "Listado Posiciones",
        "info": [
          {
            "FechaHora": "[fecha_hora]",
            "Velocidad": [velocidad],
            "Latitud": [latitud],
            "Longitud": [longitud]
          }
        ]
 * }
 *
 * @apiErrorExample Respuesta-Error:
 * error
 * */

/**
 * @api {get}/listaPosicion Lista Posiciones de Unidad
 * @apiName listado
 * @apiGroup Posiciones
 *
 * @apiHeader {Number} unidad Id de la unidad
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion consultada
 * @apiSuccess {Number} cantidad Devuelve la cantidad de datos consultados
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "msg": true,
 *      "info": [
            {
              "UnidadId": 1,
              "Imei": [numero_imei],
              "Conductor": "[nombre_conductor]",
              "Vehiculo": "[nombre_vehiculo]",
              "Velocidad": [velocidad_vehiculo_km],
              "Direccion": [numero_direccion],
              "Entradas": [numero_entradas],
              "FechaHora": "[fecha_hora]",
              "Latitud": [latitud],
              "Longitud": [longitud],
              "Kilometraje": [numero_kilometraje]
            }
        ],
        "cantidad": 1
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando la consulta no se realizo correctamente
 * @apiErrorExample Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {get}/Posicion Posicion de Unidad
 * @apiName getPosicion
 * @apiGroup Posiciones
 *
 * @apiHeader {Number} unidad Id de la unidad
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando la consulta se realizo exitosamente
 * @apiSuccess {Array} info Devuelve un arreglo con la informacion consultada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
 *      "msg": true,
 *      "info": [
            {
              "marcado": "",
              "UnidadId": 1,
              "Imei": [numero_imei],
              "Conductor": "[nombre_conductor]",
              "Vehiculo": "[nombre_vehiculo]",
              "FechaCreacion": "[fecha_creacion]",
              "Velocidad": [velocidad_vehiculo_km],
              "Direccion": [numero_direccion],
              "Entradas": [numero_entradas],
              "FechaHora": "[fecha_hora]",
              "Latitud": [latitud],
              "Longitud": [longitud],
              "url": "[enlace/ruta_icono_vehiculo]",
              "km": [numero_kilometraje]
            }
        ],
        "cantidad": 1
 * }
 *
 * @apiError {Boolean} msg Devuelve false cuando la consulta no se realizo correctamente
 * @apiErrorExample Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */