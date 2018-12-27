/**
 * Created by GMG on 08/04/2016.
 */
/**
 * @api {get}/geocercas/:visible(true|false) Listar Geocercas Visibles
 * @apiName getGeocercasVisibles
 * @apiGroup Geocercas
 *
 * @apiParam {Boolean} visible Valor que determina la visibilidad de la geocerca. Si es false devuelve todas las geocercas visibles y no visibles
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {JSON} info Devuelve la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "title": "Listado Geocercas",
        "info": [
            {
                "id": 1,
                "pos": "{\"type\":\"Feature\",\"id\":\"EJEMPO\",
                \"properties\":{\"ColorGeocerca\":\"#ff0000\",
                \"Nombre\":\"EJEMPLO\",\"Descripcion\":\"EJEMPLO\"},
                \"geometry\":{\"type\":\"Polygon\",
                \"coordinates\":[[[EjemploLatitud],[EjemploLongitud]]]}}",
                "puntos": "(Puntos de la geocerca)",
                "Visible": 1
            }
        ]
   }
 *
 * @apiError {Boolean} msg Devuelve false si ocurrio un error en la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 *  */

/**
 * @api {get}/geocercas Listar Geocercas
 * @apiName getAllGeocercas
 * @apiGroup Geocercas
 *
 * @apiParam {Number} empresa Id de la empresa
 *
 * @apiSuccess {String} title Devuelve el titulo de la respuesta
 * @apiSuccess {JSON} info Devuelve la informacion de la consulta realizada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "title": "Listado Geocercas",
        "info": [
            {
                "id": 1,
                "pos": "{\"type\":\"Feature\",\"id\":\"EJEMPO\",
                \"properties\":{\"ColorGeocerca\":\"#ff0000\",
                \"Nombre\":\"EJEMPLO\",\"Descripcion\":\"EJEMPLO\"},
                \"geometry\":{\"type\":\"Polygon\",
                \"coordinates\":[[[EjemploLatitud],[EjemploLongitud]]]}}",
                "puntos": "(Puntos de la geocerca)",
                "Visible": 1
            }
        ]
   }
 *
 * @apiError {Boolean} msg Devuelve false si ocurrio un error en la consulta
 * @apiErrorExample {JSON} Respuesta-Error:
 * {
 *      "msg": false
 * }
 * */

/**
 * @api {post}/geocercas Guardar Geocerca
 * @apiName postGeocercas
 * @apiGroup Geocercas
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {String} puntos Contiene coordenadas de la geocerca
 * @apiParam {String} estado Contiene el estado de la geocerca
 * @apiParam {String} nombre Contiene el nombre de la geocerca
 * @apiParam {String} descripcion Contiene la descripcion de la geocerca
 * @apiParam {String} color Contiene el color de la geocerca
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda la informacion
 * @apiSuccess {Number} info Devuelve el Id del campo agregado
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "msg": true,
        "info": [
            {
                "id": 1
            }
        ]
   }
 *
 * @apiError {String} msg Devuelve un mensaje cuando ocurre un error al agregar la informacion
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal server error
 * {
 *      "msg": "Error"
 * }
 * */

/**
 * @api {put}/geocercas Modificar Geocerca
 * @apiName putGeocercas
 * @apiGroup Geocercas
 *
 * @apiParam {Number} empresa Id de la empresa
 * @apiParam {Number} id Id de la geocerca a modificar
 * @apiParam {String} [puntos] Contiene coordenadas de la geocerca
 * @apiParam {String} [estado] Contiene el estado de la geocerca
 * @apiParam {String} [nombre] Contiene el nombre de la geocerca
 * @apiParam {String} [descripcion] Contiene la descripcion de la geocerca
 * @apiParam {String} [color] Contiene el color de la geocerca
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se guarda la informacion
 * @apiSuccess {Number} info Devuelve el Id del campo agregado
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "msg": true,
        "info": [
            {
                "id": 1
            }
        ]
   }
 *
 * @apiError {String} msg Devuelve un mensaje cuando ocurre un error al agregar la informacion
 * @apiErrorExample {JSON} Respuesta-Error:
 * HTTP/1.1 500 Internal server error
 * {
 *      "msg": "Error"
 * }
* */

/**
 * @api {delete}/geocercas Eliminar Geocerca
 * @apiName deleteGeocercas
 * @apiGroup Geocercas
 *
 * @apiParam {Number} id Id de la geocerca
 *
 * @apiSuccess {Boolean} msg Devuelve true cuando se elimina la geocerca
 * @apiSuccess {Number} info Devuelve el Id de la geocerca eliminada
 * @apiSuccessExample {JSON} Respuesta-Success:
 * {
        "msg": true,
        "info": [
            {
                "id": 1
            }
        ]
   }
 * @apiError {String} msg Devuelve un mensaje cuando ocurre un error al eliminar la informacion
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 {JSON} Internal server error
 * {
 *      "msg": "Error"
 * }
 * */