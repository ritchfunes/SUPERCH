/**
 * Created by GMG on 08/06/2016.
 */
/**
 * @api {post}/paradas Crear Paradas Autorizadas
 * @apiName crearParada
 * @apiGroup Paradas
 *
 * @apiParam {Array} body Arreglo de JSONs de las referencias de paradas autorizadas dentro del body del request
 * @apiParam {Number} referencias Campo referencia dentro del JSON, que apunta a la referencia a guardar como parada autorizada
 * @apiParam {Number} radio Campo de radio dentro del JSON, representa el radio aceptable de la parada autorizada en metros (mts)
 *
 * @apiSuccess [String} title Title de la respuesta del backend
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se guarda exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
	"title": "Parada creada!",
	"msg": true
}
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {put}/paradas Modificar Paradas Autorizadas
 * @apiName putParada
 * @apiGroup Paradas
 *
 * @apiParam {Number} id Id de la parada autorizada a modificar
 * @apiParam {Number} referencias Id de la referencia a modificar como parada autorizada
 * @apiParam {Number} radio Representa el radio aceptable de la parada autorizada en metros (mts)
 *
 * @apiSuccess [String} title Title de la respuesta del backend
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se guarda exitosamente
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
	"title": "Parada actualizada!",
	"msg": true
}
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/paradas Listar Paradas Autorizadas
 * @apiName getParadas
 * @apiGroup Paradas
 *
 * @apiParam {Number} empresa Id de la empresa a que pertenecen las paradas autorizadas
 *
 * @apiSuccess [String} title Title de la respuesta del backend
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se guarda exitosamente
 * @apiSuccess {Array} info Arreglo de objetos JSON con la informacion de la consulta
 * @apiSuccess {Number} cantidad Numero total de informacion devuelta
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
	"title": "Listado Paradas Autorizadas",
	"msg": true,
	"info": [{
		"ReferenciaId": 1,
		"PK_ParadasId": 1,
		"Nombre": "Parada Autorizada 1",
		"Latitud": "[Latitud de referencia]",
		"Longitud": "[Longitud de referencia]",
		"Radio": [Radio en metros]
	}, {
		"ReferenciaId": 2,
		"PK_ParadasId": 2,
		"Nombre": "Parada Autorizada 2",
		"Latitud": "[Latitud de referencia]",
		"Longitud": "[Longitud de referencia]",
		"Radio": [Radio en metros]
	}],
	"cantidad": 2
}
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {delete}/paradas Eliminar Parada
 * @apiName deleteParada
 * @apiGroup Paradas
 *
 * @apiParam {Number} id Id la parada autorizada a eliminar
 *
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * HTTP/1.1 200 OK
 *
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */

/**
 * @api {get}/paradas/true Listar Paradas No Autorizadas
 * @apiName getNoAutorizadas
 * @apiGroup Paradas
 *
 * @apiParam {Number} empresa Id de la empresa a que pertenecen las paradas no autorizadas/asignadas
 *
 * @apiSuccess [String} title Title de la respuesta del backend
 * @apiSuccess {Boolean} msg Devuelve true cuando la notificacion se guarda exitosamente
 * @apiSuccess {Array} info Arreglo de objetos JSON con la informacion de la consulta
 * @apiSuccess {Number} cantidad Numero total de informacion devuelta
 * @apiSuccessExample {JSON} Respuesta-Successs:
 * {
	"title": "Listado Paradas No Autorizadas",
	"msg": true,
	"info": [{
		"PK_ReferenciaId": 1,
		"Nombre": "Referencia 1"
	}, {
		"PK_ReferenciaId": 2,
		"Nombre": "Referencia 2"
	}],
	"cantidad": 2
}
 * @apiErrorExample Respuesta-Error:
 * HTTP/1.1 500 Internal Server Error
 * */