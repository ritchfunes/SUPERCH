define({ "api": [
  {
    "type": "get",
    "url": "/bitacoras/eventos",
    "title": "Ultimos Eventos Registrados",
    "name": "bitacoraEventos",
    "group": "Bitacora",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Devuelve el mensaje resultante del ultimo evento registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fecha",
            "description": "<p>Devuelve una cadena de caracteres con la fecha del ultimo evento del usuario registrado</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "respuesta",
            "description": "<p>Devuelve la respuesta optenida de la ejecucion del ultimo evento registrado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"data\": [\n    {\n      \"mensaje\": \"{\\\"vehiculo\\\":\\\"Ejemplo\\\",\\\"imei\\\":[numero imei],\\\"comando\\\":\\\"Apagar\\\"}\",\n      \"fecha\": \"2016-04-12 02:10:06\",\n      \"respuesta\": null\n    },\n    {\n      \"mensaje\": \"{\\\"vehiculo\\\":\\\"Ejemplo\\\",\\\"imei\\\":[numero imei],\\\"comando\\\":\\\"Abrir Llavines\\\"}\",\n      \"fecha\": \"2016-04-12 02:04:44\",\n      \"respuesta\": OK\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve nada cuando ocurre un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n  \"data\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/bitacora.js",
    "groupTitle": "Bitacora"
  },
  {
    "type": "get",
    "url": "/bitacoras/sesion",
    "title": "Ultima Sesion Registrada",
    "name": "bitacoraSesion",
    "group": "Bitacora",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fecha",
            "description": "<p>Devuelve una cadena de caracteres con la fecha de la ultima sesion del usuario registrada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"fecha\": \"2016-04-12 01:44:50\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "fecha",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n  \"fecha\": \"no se cuando\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/bitacora.js",
    "groupTitle": "Bitacora"
  },
  {
    "type": "delete",
    "url": "/categorias",
    "title": "Eliminar Categoria de Empresa",
    "name": "eliminarCategoria",
    "group": "Categorias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la categoria a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error en la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/categorias.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "post",
    "url": "/categorias",
    "title": "Guardar Categoria de Empresa",
    "name": "guardarCategoria",
    "group": "Categorias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoria",
            "description": "<p>Nombre de la categoria</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion de a categoria a guardar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda exitosamente la categoria</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el id de la categoria agregada dentro de un objeto JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"msg\": true,\n  \"info\":{\n    \"id\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/categorias.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "get",
    "url": "/categorias",
    "title": "Listar Categorias de Empresa",
    "name": "listarCategorias",
    "group": "Categorias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"msg\": true,\n  \"info\": [\n    {\n      \"id\": 1,\n      \"Categoria\": \"General\",\n      \"Descripcion\": \"General\",\n      \"EmpresaId\": \"0\"\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error en la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/categorias.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "put",
    "url": "/categorias",
    "title": "Modificar Categoria de Empresa",
    "name": "modificarCategoria",
    "group": "Categorias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la categoria a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "descripcion",
            "description": "<p>Descripcion de la categoria</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "categoria",
            "description": "<p>Nombre de la categoria</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "500",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/categorias.js",
    "groupTitle": "Categorias"
  },
  {
    "type": "post",
    "url": "/comandos/apagar",
    "title": "Apagar vehiculo",
    "name": "comandoApagar",
    "group": "Comandos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"data\": \"error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/comandos.js",
    "groupTitle": "Comandos"
  },
  {
    "type": "post",
    "url": "/comandos/habilitar",
    "title": "Habilitar vehiculo",
    "name": "comandoHabilitar",
    "group": "Comandos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"data\": \"error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/comandos.js",
    "groupTitle": "Comandos"
  },
  {
    "type": "post",
    "url": "/comandos/llavines",
    "title": "Abrir llavines del vehiculo",
    "name": "comandoLlavines",
    "group": "Comandos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"data\": \"error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/comandos.js",
    "groupTitle": "Comandos"
  },
  {
    "type": "post",
    "url": "/comandos/otro",
    "title": "Otro Comando de unidad",
    "name": "comandoOtro",
    "group": "Comandos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comando",
            "description": "<p>Comando gps a ejecutarse</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "FALTA pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"data\": \"error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/comandos.js",
    "groupTitle": "Comandos"
  },
  {
    "type": "post",
    "url": "/comandos/posicion",
    "title": "Ubicar Posicion de vehiculo",
    "name": "comandoPosicion",
    "group": "Comandos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "pos,[numero imei],[fecha ultima posicion],[longitud],[latitud]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Devuelve un mensaje cuando hubo algun error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"data\": \"error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/comandos.js",
    "groupTitle": "Comandos"
  },
  {
    "type": "post",
    "url": "/conductores",
    "title": "Crear Conductor",
    "name": "crearConductor",
    "group": "Conductores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apellido",
            "description": "<p>Apellido del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "telefono",
            "description": "<p>Telefono del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "direccion",
            "description": "<p>Direccion del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identidad",
            "description": "<p>Identidad del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Datatime",
            "optional": false,
            "field": "fechaExp",
            "description": "<p>Fecha de expiracion de licencia del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ficha",
            "description": "<p>Ficha del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa del Conductor</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando el Conductor se crea exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el id del Conductor creado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true,\n \"info\": {\n     \"id\": 1\n }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/conductores.js",
    "groupTitle": "Conductores"
  },
  {
    "type": "delete",
    "url": "/conductores",
    "title": "Eliminar Conductor",
    "name": "eliminarConductor",
    "group": "Conductores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del Conductor a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando el Conductor se elimina exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al eliminar al Conductor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/conductores.js",
    "groupTitle": "Conductores"
  },
  {
    "type": "get",
    "url": "/conductores",
    "title": "Listar Conductores",
    "name": "listarConductores",
    "group": "Conductores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id del empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realiza exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta dentro de un objeto JSON</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Devuelve la cantidad de registros consultados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"msg\": true,\n  \"info\": [\n    {\n      \"IdConductor\": 1,\n      \"Nombre\": \"[nombre_conductor]\",\n      \"Telefono\": \"[digitos_telefono]\",\n      \"Direccion\": \"[direccion_conductor]\",\n      \"Identidad\": \"[identidad_conductor]\",\n      \"FechaExp\": \"[fecha_expiracion]\",\n      \"Ficha\": \"[ficha]\",\n      \"EmpresaId\": [id_empresa]\n    }\n  ],\n  \"cantidad\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/conductores.js",
    "groupTitle": "Conductores"
  },
  {
    "type": "put",
    "url": "/conductores",
    "title": "Modificar Conductor",
    "name": "modificarConductor",
    "group": "Conductores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del Conductor a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Nombre del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "apellido",
            "description": "<p>Apellido del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "telefono",
            "description": "<p>Telefono del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "direccion",
            "description": "<p>Direccion del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "identidad",
            "description": "<p>Identidad del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Datatime",
            "optional": true,
            "field": "fechaExp",
            "description": "<p>Fecha de expiracion de licencia del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ficha",
            "description": "<p>Ficha del Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "empresa",
            "description": "<p>Id de la empresa del Conductor</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/conductores.js",
    "groupTitle": "Conductores"
  },
  {
    "type": "delete",
    "url": "/empresas",
    "title": "Eliminar Empresa",
    "name": "eliminarEmpresa",
    "group": "Empresas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la empresa a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/empresas.js",
    "groupTitle": "Empresas"
  },
  {
    "type": "get",
    "url": "/empresas",
    "title": "Listar Empresas",
    "name": "listarEmpresas",
    "group": "Empresas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "socio",
            "description": "<p>Id del socio</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realiza correctamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion de la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"msg\": true,\n  \"info\": [\n    {\n      \"id_empresa\": 1,\n      \"Nombre\": \"[nombre de empresa]\",\n      \"Descripcion\": \"[descripcion de empresa]\",\n      \"id_socio\": 1,\n      \"Activo\": 1\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/empresas.js",
    "groupTitle": "Empresas"
  },
  {
    "type": "put",
    "url": "/empresas",
    "title": "Modificar Empresa",
    "name": "modificarEmpresa",
    "group": "Empresas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Nombre de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "descripcion",
            "description": "<p>Descripcion de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "activo",
            "description": "<p>1: activo, 0: no activo</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/empresas.js",
    "groupTitle": "Empresas"
  },
  {
    "type": "post",
    "url": "/empresas",
    "title": "Guardar Empresa",
    "name": "postEmpresa",
    "group": "Empresas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "socio",
            "description": "<p>Id del socio</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda la empresa correctamente</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el id de la empresa guardada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n     \"msg\": true,\n     \"info\": {\n         \"id\": 1\n     }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/empresas.js",
    "groupTitle": "Empresas"
  },
  {
    "type": "get",
    "url": "/eventos/all?fecha=[fechaInicio]&fechafin=[fechaFinal]",
    "title": "Obtener Todos los Eventos de las Unidades de una Empresa",
    "name": "getAllEventos",
    "group": "Eventos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha y hora de inicio como rango de busqueda de Eventos</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fechafin",
            "description": "<p>Fecha y hora final como rango de busqueda de Eventos</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Devuelve el numero de regristros consultados</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"title\": \"Listado Eventos\",\n  \"cantidad\": 2,\n  \"info\": [\n    {\n      \"vehiculo\": \"[nombre vehiculo]\",\n      \"FechaHora\": \"[fechahora]\",\n      \"Latitud\": [latitud],\n      \"Longitud\": [longitud],\n      \"Velocidad\": [velocidad],\n      \"Direccion\": [direccion],\n      \"imei\": [imei],\n      \"Entradas\": [entradas],\n      \"nombre\": \"[nombre evento]\"\n    },\n    {\n      \"vehiculo\": \"[nombre vehiculo]\",\n      \"FechaHora\": \"[fechahora]\",\n      \"Latitud\": [latitud],\n      \"Longitud\": [longitud],\n      \"Velocidad\": [velocidad],\n      \"Direccion\": [direccion],\n      \"imei\": [imei],\n      \"Entradas\": [entradas],\n      \"nombre\": \"[nombre evento]\"\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Devuelve un numero del error ocurrido en la consulta</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando ocurre un error con la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"status\": 500,\n     \"msg\": \"error\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/eventos.js",
    "groupTitle": "Eventos"
  },
  {
    "type": "get",
    "url": "/listaEventos",
    "title": "Listar Eventos",
    "name": "listaEventos",
    "group": "Eventos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"title\": \"Listado Eventos\",\n  \"info\": [\n    {\n      \"PK_EventoId\": 1,\n      \"Nombre\": \"Encendido\"\n    },\n    {\n      \"PK_EventoId\": 2,\n      \"Nombre\": \"Apagado\"\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/eventos.js",
    "groupTitle": "Eventos"
  },
  {
    "type": "delete",
    "url": "/filtros",
    "title": "Eliminar Filtro de Empresa",
    "name": "deleteFiltro",
    "group": "Filtros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del filtro a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/filtros.js",
    "groupTitle": "Filtros"
  },
  {
    "type": "get",
    "url": "/filtros",
    "title": "Listar Filtros de Empresa",
    "name": "getFiltros",
    "group": "Filtros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"[nombreFiltro]\": [\n    {\n      \"FiltroId\": [id],\n      \"Nombre\": \"[nombreFiltro]\",\n      \"Correos\": \"[correosFiltro]\",\n      \"d1\": 1,\n      \"d2\": 1,\n      \"d3\": 1,\n      \"d4\": 1,\n      \"d5\": 1,\n      \"d6\": 0,\n      \"d7\": 0,\n      \"Desde\": \"[fechaInicio]\",\n      \"Hasta\": \"[fechaFinal]\",\n      \"PK_GeocercaId\": [idGeocerca],\n      \"Frecuencia\": 1,\n      \"TipoEntrada\": 1,\n      \"TipoSalida\": 0,\n      \"TipoVelocidad\": 0,\n      \"TipoPermanencia\": 1,\n      \"VelocidadMax\": [velMaxKm],\n      \"VelocidadMin\": [velMinKm],\n      \"Tiempo\": [minutos],\n      \"imei\": [numeroImei],\n      \"UnidadId\": [idUnidad],\n      \"Nombre_Vehiculo\": \"[nombreVehiculo]\"\n    }\n  ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/filtros.js",
    "groupTitle": "Filtros"
  },
  {
    "type": "post",
    "url": "/filtros",
    "title": "Guardar Filtro de Empresa",
    "name": "postFiltro",
    "group": "Filtros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "unidades",
            "description": "<p>Arreglo con las unidades que estan dentro del filtro</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "geocercas",
            "description": "<p>Arreglo con las geocercas del filtro a guardar</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "filtro",
            "description": "<p>Objeto JSON que guarda la informacion del filtro (nombre, correos, tipoVelocidad, tipoPermanencia, tipoEntrada, tipoSalida, d1-&gt;d7, desde, hasta, frecuencia, [tiempo], [descripcion], [velocidadMax], [velocidadMin])</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda el filtro correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n     \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al guardar el filtro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/filtros.js",
    "groupTitle": "Filtros"
  },
  {
    "type": "put",
    "url": "/filtros",
    "title": "Modificar Filtro de Empresa",
    "name": "putFiltro",
    "group": "Filtros",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "unidades",
            "description": "<p>Arreglo con las unidades que estan dentro del filtro</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "geocercas",
            "description": "<p>Arreglo con las geocercas del filtro a guardar</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "filtro",
            "description": "<p>Objeto JSON que guarda la informacion del filtro (nombre, correos, tipoVelocidad, tipoPermanencia, tipoEntrada, tipoSalida, d1-&gt;d7, desde, hasta, frecuencia, [tiempo], [descripcion], [velocidadMax], [velocidadMin])</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda el filtro correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n     \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al guardar el filtro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error 1",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        },
        {
          "title": "Respuesta-Error 2",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/filtros.js",
    "groupTitle": "Filtros"
  },
  {
    "type": "delete",
    "url": "/geocercas",
    "title": "Eliminar Geocerca",
    "name": "deleteGeocercas",
    "group": "Geocercas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la geocerca</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se elimina la geocerca</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el Id de la geocerca eliminada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"msg\": true,\n        \"info\": [\n            {\n                \"id\": 1\n            }\n        ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando ocurre un error al eliminar la informacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 {JSON} Internal server error\n{\n     \"msg\": \"Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocercas.js",
    "groupTitle": "Geocercas"
  },
  {
    "type": "get",
    "url": "/geocercas",
    "title": "Listar Geocercas",
    "name": "getAllGeocercas",
    "group": "Geocercas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"title\": \"Listado Geocercas\",\n        \"info\": [\n            {\n                \"id\": 1,\n                \"pos\": \"{\\\"type\\\":\\\"Feature\\\",\\\"id\\\":\\\"EJEMPO\\\",\n                \\\"properties\\\":{\\\"ColorGeocerca\\\":\\\"#ff0000\\\",\n                \\\"Nombre\\\":\\\"EJEMPLO\\\",\\\"Descripcion\\\":\\\"EJEMPLO\\\"},\n                \\\"geometry\\\":{\\\"type\\\":\\\"Polygon\\\",\n                \\\"coordinates\\\":[[[EjemploLatitud],[EjemploLongitud]]]}}\",\n                \"puntos\": \"(Puntos de la geocerca)\",\n                \"Visible\": 1\n            }\n        ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false si ocurrio un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocercas.js",
    "groupTitle": "Geocercas"
  },
  {
    "type": "get",
    "url": "/geocercas/:visible(true|false)",
    "title": "Listar Geocercas Visibles",
    "name": "getGeocercasVisibles",
    "group": "Geocercas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "visible",
            "description": "<p>Valor que determina la visibilidad de la geocerca. Si es false devuelve todas las geocercas visibles y no visibles</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"title\": \"Listado Geocercas\",\n        \"info\": [\n            {\n                \"id\": 1,\n                \"pos\": \"{\\\"type\\\":\\\"Feature\\\",\\\"id\\\":\\\"EJEMPO\\\",\n                \\\"properties\\\":{\\\"ColorGeocerca\\\":\\\"#ff0000\\\",\n                \\\"Nombre\\\":\\\"EJEMPLO\\\",\\\"Descripcion\\\":\\\"EJEMPLO\\\"},\n                \\\"geometry\\\":{\\\"type\\\":\\\"Polygon\\\",\n                \\\"coordinates\\\":[[[EjemploLatitud],[EjemploLongitud]]]}}\",\n                \"puntos\": \"(Puntos de la geocerca)\",\n                \"Visible\": 1\n            }\n        ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false si ocurrio un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocercas.js",
    "groupTitle": "Geocercas"
  },
  {
    "type": "post",
    "url": "/geocercas",
    "title": "Guardar Geocerca",
    "name": "postGeocercas",
    "group": "Geocercas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "puntos",
            "description": "<p>Contiene coordenadas de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "estado",
            "description": "<p>Contiene el estado de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Contiene el nombre de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Contiene la descripcion de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>Contiene el color de la geocerca</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda la informacion</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el Id del campo agregado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"msg\": true,\n        \"info\": [\n            {\n                \"id\": 1\n            }\n        ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando ocurre un error al agregar la informacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal server error\n{\n     \"msg\": \"Error\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocercas.js",
    "groupTitle": "Geocercas"
  },
  {
    "type": "put",
    "url": "/geocercas",
    "title": "Modificar Geocerca",
    "name": "putGeocercas",
    "group": "Geocercas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la geocerca a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "puntos",
            "description": "<p>Contiene coordenadas de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "estado",
            "description": "<p>Contiene el estado de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Contiene el nombre de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "descripcion",
            "description": "<p>Contiene la descripcion de la geocerca</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>Contiene el color de la geocerca</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda la informacion</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el Id del campo agregado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"msg\": true,\n        \"info\": [\n            {\n                \"id\": 1\n            }\n        ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando ocurre un error al agregar la informacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal server error\n{\n     \"msg\": \"Error\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocercas.js",
    "groupTitle": "Geocercas"
  },
  {
    "type": "get",
    "url": "/geocoder?lat=00.00&lon=-00.00",
    "title": "Obtener Geocodigo",
    "name": "getGeocoder",
    "group": "Geocode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Parametro de la Latitud</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lon",
            "description": "<p>Parametro de la Longitud</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dis",
            "description": "<p>Devuelve el valor de distancia</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "obj",
            "description": "<p>Devuelve el punto de referencia y sus propiedades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"dis\": 00.000,\n        \"obj\": {\n            \"_id\": \"ej3mpl0\",\n            \"type\": \"Feature\",\n            \"geometry\": {\n                \"type\": \"Point\",\n                \"coordinates\": [\n                    00.00,\n                    00.00\n                ]\n            },\n            \"properties\": {\n                \"empresa\": 1,\n                \"nombre\": \"ejemplo\",\n                \"Descripcion\": \"ejemplo de empresa\"\n            }\n        }\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/geocode.js",
    "groupTitle": "Geocode"
  },
  {
    "type": "post",
    "url": "/iconos",
    "title": "Agregar Icono",
    "name": "addIconos",
    "group": "Iconos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Ruta o enlace del icono a agregar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un objeto JSON con la informacion del icono agregado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"info\": {\n    \"fieldCount\": 0,\n    \"affectedRows\": 1,\n    \"insertId\": 1,\n    \"serverStatus\": 2,\n    \"warningCount\": 0,\n    \"message\": \"\",\n    \"protocol41\": true,\n    \"changedRows\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err",
            "description": "<p>Devuelve -1 si ocurrio algun error al agregar el icono</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"err\": -1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/iconos.js",
    "groupTitle": "Iconos"
  },
  {
    "type": "get",
    "url": "/iconos?id=[id]",
    "title": "Obtener Icono",
    "name": "getIconos",
    "group": "Iconos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del icono a buscar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"title\": \"Iconos\",\n  \"info\": [\n    {\n      \"id\": [id],\n      \"url\": \"[url]\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err",
            "description": "<p>Devuelve -1 si ocurrio algun error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"err\": -1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/iconos.js",
    "groupTitle": "Iconos"
  },
  {
    "type": "delete",
    "url": "/notificaciones",
    "title": "Eliminar Notificacion",
    "name": "eliminarNotificacion",
    "group": "Notificaciones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la Notificacion a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se elimina exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al eliminar la notificacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/notificaciones.js",
    "groupTitle": "Notificaciones"
  },
  {
    "type": "post",
    "url": "/notificaciones",
    "title": "Guardar Notificacion",
    "name": "guardarNotificacion",
    "group": "Notificaciones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la Notificacion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "correos",
            "description": "<p>Correos que recibiran Notificaciones</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id del Usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "unidades",
            "description": "<p>Arreglo de Unidades que reportaran Notificaciones</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "evento",
            "description": "<p>Id del evento de la Notificacion</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se guarda exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al guardar la notificacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/notificaciones.js",
    "groupTitle": "Notificaciones"
  },
  {
    "type": "get",
    "url": "/notificaciones",
    "title": "Listar Notificaciones",
    "name": "listarNotificaciones",
    "group": "Notificaciones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id del Usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realiza exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta dentro de un objeto JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"msg\": true,\n  \"info\": {\n    \"[nombre_notificacion]\": [\n      {\n        \"Id\": 1,\n        \"nombre\": \"[nombre_notificacion]\",\n        \"correo\": \"[correo]\",\n        \"Nombre_Vehiculo\": \"[nombre_vehiculo]\"\n      }\n    ]\n  }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/notificaciones.js",
    "groupTitle": "Notificaciones"
  },
  {
    "type": "put",
    "url": "/notificaciones",
    "title": "Modificar Notificacion",
    "name": "modificarNotificacion",
    "group": "Notificaciones",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la notificacion a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nombre",
            "description": "<p>Nombre de la Notificacion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "correos",
            "description": "<p>Correos que recibiran Notificaciones</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "usuario",
            "description": "<p>Id del Usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "unidades",
            "description": "<p>Arreglo de Unidades a cambiar en Notificaciones</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "evento",
            "description": "<p>Arreglo de eventos a cambiar en Notificaciones</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se modifica exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando ocurre algun error al modificar la notificacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/notificaciones.js",
    "groupTitle": "Notificaciones"
  },
  {
    "type": "post",
    "url": "/paradas",
    "title": "Crear Paradas Autorizadas",
    "name": "crearParada",
    "group": "Paradas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "body",
            "description": "<p>Arreglo de JSONs de las referencias de paradas autorizadas dentro del body del request</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "referencias",
            "description": "<p>Campo referencia dentro del JSON, que apunta a la referencia a guardar como parada autorizada</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "radio",
            "description": "<p>Campo de radio dentro del JSON, representa el radio aceptable de la parada autorizada en metros (mts)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "String",
            "description": "<p>} title Title de la respuesta del backend</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se guarda exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n\t\"title\": \"Parada creada!\",\n\t\"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/paradas.js",
    "groupTitle": "Paradas"
  },
  {
    "type": "delete",
    "url": "/paradas",
    "title": "Eliminar Parada",
    "name": "deleteParada",
    "group": "Paradas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id la parada autorizada a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/paradas.js",
    "groupTitle": "Paradas"
  },
  {
    "type": "get",
    "url": "/paradas/true",
    "title": "Listar Paradas No Autorizadas",
    "name": "getNoAutorizadas",
    "group": "Paradas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa a que pertenecen las paradas no autorizadas/asignadas</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "String",
            "description": "<p>} title Title de la respuesta del backend</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se guarda exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Arreglo de objetos JSON con la informacion de la consulta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Numero total de informacion devuelta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n\t\"title\": \"Listado Paradas No Autorizadas\",\n\t\"msg\": true,\n\t\"info\": [{\n\t\t\"PK_ReferenciaId\": 1,\n\t\t\"Nombre\": \"Referencia 1\"\n\t}, {\n\t\t\"PK_ReferenciaId\": 2,\n\t\t\"Nombre\": \"Referencia 2\"\n\t}],\n\t\"cantidad\": 2\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/paradas.js",
    "groupTitle": "Paradas"
  },
  {
    "type": "get",
    "url": "/paradas",
    "title": "Listar Paradas Autorizadas",
    "name": "getParadas",
    "group": "Paradas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa a que pertenecen las paradas autorizadas</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "String",
            "description": "<p>} title Title de la respuesta del backend</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se guarda exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Arreglo de objetos JSON con la informacion de la consulta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Numero total de informacion devuelta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n\t\"title\": \"Listado Paradas Autorizadas\",\n\t\"msg\": true,\n\t\"info\": [{\n\t\t\"ReferenciaId\": 1,\n\t\t\"PK_ParadasId\": 1,\n\t\t\"Nombre\": \"Parada Autorizada 1\",\n\t\t\"Latitud\": \"[Latitud de referencia]\",\n\t\t\"Longitud\": \"[Longitud de referencia]\",\n\t\t\"Radio\": [Radio en metros]\n\t}, {\n\t\t\"ReferenciaId\": 2,\n\t\t\"PK_ParadasId\": 2,\n\t\t\"Nombre\": \"Parada Autorizada 2\",\n\t\t\"Latitud\": \"[Latitud de referencia]\",\n\t\t\"Longitud\": \"[Longitud de referencia]\",\n\t\t\"Radio\": [Radio en metros]\n\t}],\n\t\"cantidad\": 2\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/paradas.js",
    "groupTitle": "Paradas"
  },
  {
    "type": "put",
    "url": "/paradas",
    "title": "Modificar Paradas Autorizadas",
    "name": "putParada",
    "group": "Paradas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la parada autorizada a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "referencias",
            "description": "<p>Id de la referencia a modificar como parada autorizada</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "radio",
            "description": "<p>Representa el radio aceptable de la parada autorizada en metros (mts)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "String",
            "description": "<p>} title Title de la respuesta del backend</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la notificacion se guarda exitosamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n\t\"title\": \"Parada actualizada!\",\n\t\"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/paradas.js",
    "groupTitle": "Paradas"
  },
  {
    "type": "get",
    "url": "/Posicion",
    "title": "Posicion de Unidad",
    "name": "getPosicion",
    "group": "Posiciones",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "unidad",
            "description": "<p>Id de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"msg\": true,\n     \"info\": [\n            {\n              \"marcado\": \"\",\n              \"UnidadId\": 1,\n              \"Imei\": [numero_imei],\n              \"Conductor\": \"[nombre_conductor]\",\n              \"Vehiculo\": \"[nombre_vehiculo]\",\n              \"FechaCreacion\": \"[fecha_creacion]\",\n              \"Velocidad\": [velocidad_vehiculo_km],\n              \"Direccion\": [numero_direccion],\n              \"Entradas\": [numero_entradas],\n              \"FechaHora\": \"[fecha_hora]\",\n              \"Latitud\": [latitud],\n              \"Longitud\": [longitud],\n              \"url\": \"[enlace/ruta_icono_vehiculo]\",\n              \"km\": [numero_kilometraje]\n            }\n        ],\n        \"cantidad\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando la consulta no se realizo correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/posiciones.js",
    "groupTitle": "Posiciones"
  },
  {
    "type": "get",
    "url": "/listaPosicion",
    "title": "Lista Posiciones de Unidad",
    "name": "listado",
    "group": "Posiciones",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "unidad",
            "description": "<p>Id de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion consultada</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Devuelve la cantidad de datos consultados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"msg\": true,\n     \"info\": [\n            {\n              \"UnidadId\": 1,\n              \"Imei\": [numero_imei],\n              \"Conductor\": \"[nombre_conductor]\",\n              \"Vehiculo\": \"[nombre_vehiculo]\",\n              \"Velocidad\": [velocidad_vehiculo_km],\n              \"Direccion\": [numero_direccion],\n              \"Entradas\": [numero_entradas],\n              \"FechaHora\": \"[fecha_hora]\",\n              \"Latitud\": [latitud],\n              \"Longitud\": [longitud],\n              \"Kilometraje\": [numero_kilometraje]\n            }\n        ],\n        \"cantidad\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando la consulta no se realizo correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/posiciones.js",
    "groupTitle": "Posiciones"
  },
  {
    "type": "get",
    "url": "/posiciones?imei=[numero_imei]",
    "title": "Listar Posiciones",
    "name": "listarPosiciones",
    "group": "Posiciones",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"title\": \"Listado Posiciones\",\n        \"info\": [\n          {\n            \"FechaHora\": \"[fecha_hora]\",\n            \"Velocidad\": [velocidad],\n            \"Latitud\": [latitud],\n            \"Longitud\": [longitud]\n          }\n        ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/posiciones.js",
    "groupTitle": "Posiciones"
  },
  {
    "type": "get",
    "url": "/recorridos?imei=[numeroImei]&desde=[fechaInicio]&hasta=[fechaFinal]",
    "title": "Listar Recorridos",
    "name": "getPuntos",
    "group": "Recorridos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Numero del imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "desde",
            "description": "<p>Fecha y hora de inicio como rango de busqueda de recorridos</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "hasta",
            "description": "<p>Fecha y hora final como rango de busqueda de recorridos</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Devuelve el numero de registros consultados</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un objeto de tipo JSON con la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"title\": \"Listado Posiciones\",\n  \"cantidad\": 2,\n  \"info\": [\n    {\n      \"FechaHora\": \"[fechahora]\",\n      \"Velocidad\": [velocidad],\n      \"Latitud\": [latitud],\n      \"Longitud\": [longitud],\n      \"Direccion\": [direccion]\n    },\n    {\n      \"FechaHora\": \"[fechahora]\",\n      \"Velocidad\": [velocidad],\n      \"Latitud\": [latitud],\n      \"Longitud\": [longitud],\n      \"Direccion\": [direccion]\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/recorridos.js",
    "groupTitle": "Recorridos"
  },
  {
    "type": "post",
    "url": "/recorridosHora",
    "title": "Listar Recorridos Ultima Hora",
    "name": "getRecorridosHora",
    "group": "Recorridos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "imei",
            "description": "<p>Arreglo con los Imeis de las unidades para buscar el recorrido reciente</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Titulo de la respuesta de la consulta</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un objeto tipo JSON que contiene arreglos de la informacion agrupada por los Imeis</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Devuelve la cantidad total de informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"title\": \"Recorridos por Hora\",\n  \"msg\": true,\n  \"info\": {\n    \"357666051278718\": [\n      {\n        \"Imei\": 357666051278718,\n        \"FechaHora\": \"2016-04-28 14:52:36\",\n        \"Latitud\": 14.04083,\n        \"Longitud\": -87.22888,\n        \"Velocidad\": 0\n      }\n    ]\n  },\n  \"cantidad\": 1\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/recorridos.js",
    "groupTitle": "Recorridos"
  },
  {
    "type": "delete",
    "url": "/referencias?id=id",
    "title": "Eliminar Referencia",
    "name": "deleteReferencias",
    "group": "Referencias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la Referencia</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se elimina la referencia correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando la consulta no se realizo correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n     \"msg\": \"Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/referencias.js",
    "groupTitle": "Referencias"
  },
  {
    "type": "get",
    "url": "/referencias",
    "title": "Listar Referencias",
    "name": "getReferencias",
    "group": "Referencias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realizo exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion consultada</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidada",
            "description": "<p>Devuelve la cantidad de datos consultados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"msg\": true,\n     \"info\": [\n            {\n              \"Id\": 1,\n              \"Nombre\": \"Ejemplo\",\n              \"Descripcion\": \"Ejemplo Referencia\",\n              \"Longitud\": 00.00,\n              \"Latitud\": 00.00,\n              \"visibleCompuesto\": \"Si\",\n              \"url\": \"icono.png\",\n              \"CategoriaId\": 1,\n              \"Categoria\": \"Ejemplo Categoria\"\n            },\n            {\n              \"Id\": 2,\n              \"Nombre\": \"Ejemplo 2\",\n              \"Descripcion\": \"Ejemplo 2 de Referencia\",\n              \"Longitud\": 00.00,\n              \"Latitud\": 00.00,\n              \"visibleCompuesto\": \"Si\",\n              \"url\": \"icono2.png\",\n              \"CategoriaId\": 1,\n              \"Categoria\": \"Ejemplo Categoria\"\n            }\n        ],\n        \"cantidada\": 2\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando la consulta no se realizo correctamente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/referencias.js",
    "groupTitle": "Referencias"
  },
  {
    "type": "get",
    "url": "/referencias/iconos",
    "title": "Listar Iconos de Referencias",
    "name": "getReferenciasIconos",
    "group": "Referencias",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con la informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"title\": \"Listado ReferenciasIconos\",\n     \"info\": [\n            {\n              \"PK_ReferenciasIconosId\": 1,\n              \"url\": \"icono1.png\"\n            },\n            {\n              \"PK_ReferenciasIconosId\": 2,\n              \"url\": \"icono2.png\"\n            },\n            {\n              \"PK_ReferenciasIconosId\": 3,\n              \"url\": \"icono3.png\"\n            }\n        ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Repuesta-Error:",
          "content": "error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/referencias.js",
    "groupTitle": "Referencias"
  },
  {
    "type": "post",
    "url": "/referencias",
    "title": "Guardar Referencias",
    "name": "postReferencias",
    "group": "Referencias",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre de la referencia</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descipcion",
            "description": "<p>Descripcion de la referencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitud",
            "description": "<p>Latitud en que se encuentra la referencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitud",
            "description": "<p>Longitud en que se encuentra la referencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "iconoId",
            "description": "<p>Id del icono de la referencia</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "visible",
            "description": "<p>Determina la visibilidad de la referencia. 1: visible, 0: no visible</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoriaId",
            "description": "<p>Id de la categoria a que pertenece la referencia</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se guarda la referencia</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion del campo agregado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n     \"msg\": true,\n     \"info\": {\n            \"id\": 244\n        }\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve un mensaje cuando ocurre un error al guardar la informacion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n     \"msg\": \"Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/referencias.js",
    "groupTitle": "Referencias"
  },
  {
    "type": "get",
    "url": "/reportAccFecha?fechainicio=[fechaInicio]&fechafin=[fechaFin]",
    "title": "Reporte de Acceso por Fecha a la Plataforma",
    "name": "getReporteAccFecha",
    "group": "Reportes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fechainicio",
            "description": "<p>Fecha de inicio a buscar en el Reporte. NOTA: La Fecha de Inicio NO debe ser Mayor que la Fecha Final (fechafin)</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fechafin",
            "description": "<p>Fecha final del rango a buscar en el Reporte. NOTA: La Fecha Final NO debe ser Menor que la Fecha de Inicio (fechainicio)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta de la consulta</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realiza exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con objetos tipo JSON que contienen la informacion consultada</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Cantidad de informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"title\": \"Reporte de Acceso a Plataforma por Fecha\",\n  \"msg\": true,\n  \"info\": [\n    {\n      \"IdUsuario\": [IdUsuario],\n      \"Usuario\": \"[Usuario]\",\n      \"fecha\": \"2016-04-20 20:09:29\",\n      \"CantidadAcceso\": 3\n    }\n  ],\n  \"cantidad\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/reportes.js",
    "groupTitle": "Reportes"
  },
  {
    "type": "get",
    "url": "/reportAcceso",
    "title": "Reporte de Acceso a la Plataforma",
    "name": "getReporteAccesso",
    "group": "Reportes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta de la consulta</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la consulta se realiza exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve un arreglo con objetos tipo JSON que contienen la informacion consultada</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cantidad",
            "description": "<p>Cantidad de informacion consultada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n  \"title\": \"Reporte de Acceso a Plataforma\",\n  \"msg\": true,\n  \"info\": [\n    {\n      \"IdUsuario\": [IdUsuario],\n      \"Usuario\": \"[Usuario]\",\n      \"fecha\": \"2016-04-20 20:09:29\",\n      \"CantidadAcceso\": 3\n    }\n  ],\n  \"cantidad\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/reportes.js",
    "groupTitle": "Reportes"
  },
  {
    "type": "delete",
    "url": "/roles",
    "title": "Eliminar Rol",
    "name": "eliminarRol",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del rol a eliminar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/roles.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/roles",
    "title": "Guardar Rol",
    "name": "guardarRol",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del rol</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/roles.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "/roles",
    "title": "Listar Roles",
    "name": "listarRoles",
    "group": "Roles",
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "[\n {\n   \"rol_id\": 1,\n   \"Descripcion\": \"[descripcion_rol]\"\n }\n]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/roles.js",
    "groupTitle": "Roles"
  },
  {
    "type": "put",
    "url": "/roles",
    "title": "Modificar Rol",
    "name": "modificarRol",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id del rol a modificar</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del rol</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/roles.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/sat",
    "title": "Conexion del SAT 1",
    "name": "SAT",
    "group": "SAT",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "transfer",
            "description": "<p>Codigo de Transferencia</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "unit",
            "description": "<p>Codigo de Unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "driver",
            "description": "<p>Codigo de Conductor</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "origin",
            "description": "<p>Codigo de Origen</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "destiny",
            "description": "<p>Codigo de Destino</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "arrival_date",
            "description": "<p>Fecha de llegada al destino, formato: 'YYYY-MM-DD'</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "arrival_time",
            "description": "<p>Tiempo de llegada al destino, formato: 'HH:mm:ss'</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "return_date",
            "description": "<p>Fecha de retorno desde el destino, formato: 'YYYY-MM-DD'</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "return_time",
            "description": "<p>Tiempo de retorno desde el destino, formato: 'HH:mm:ss'</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/SAT1.js",
    "groupTitle": "SAT"
  },
  {
    "type": "delete",
    "url": "/unidades",
    "title": "Eliminar Unidad",
    "name": "deleteUnidades",
    "group": "Unidades",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/unidades.js",
    "groupTitle": "Unidades"
  },
  {
    "type": "get",
    "url": "/unidades",
    "title": "Listar Unidades",
    "name": "getAllUnidades",
    "group": "Unidades",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresa",
            "description": "<p>Id de la empresa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando la cosulta se realiza exitosamente</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Devuelve el titulo de la respuesta</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta realizada en un arreglo de objetos JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n  \"msg\": true,\n    \"title\": \"Listado Unidades\",\n    \"info\": [\n        {\n            \"marcado\": \"\",\n            \"UnidadId\": 1,\n            \"Imei\": 000000000000000,\n            \"Conductor\": \"Conductor\",\n            \"apellido\": \"\",\n            \"Vehiculo\": \"MarcaVehiculo\",\n            \"FechaCreacion\": \"2016-04-09 9:10:56\",\n            \"Velocidad\": 0,\n            \"Direccion\": 1,\n            \"Entradas\": 0,\n            \"FechaHora\": \"2016-04-09 15:38:56\",\n            \"Latitud\": 00.000000,\n            \"Longitud\": -00.000000,\n            \"url\": \"icon.png\",\n            \"km\": 0.0\n        }\n    ]\n  }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false si ocurrio un error en la consulta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/unidades.js",
    "groupTitle": "Unidades"
  },
  {
    "type": "post",
    "url": "/unidades",
    "title": "Guardar Unidad",
    "name": "postUnidades",
    "group": "Unidades",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "modelo",
            "description": "<p>Id del modelo de GPS instalado en la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Contiene el nombre de la marca del vehiculo de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "activo",
            "description": "<p>Guarda true si la unidad esta activa o false si esta inactiva</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "icono",
            "description": "<p>Id del icono de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha de creacion de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "conductor",
            "description": "<p>Id del conductor de la unidad</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/unidades.js",
    "groupTitle": "Unidades"
  },
  {
    "type": "put",
    "url": "/unidades",
    "title": "Modificar Unidad",
    "name": "putUnidades",
    "group": "Unidades",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "imei",
            "description": "<p>Numero del imei de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "conductor",
            "description": "<p>Id del conductor de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehiculo",
            "description": "<p>Modelo del vehiculo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icono",
            "description": "<p>Numero del icono a usar</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Devuelve &quot;ok&quot; cuando se guarda la informacion</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve la informacion de la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        {\n            \"result\": \"ok\",\n            \"info\": {\n                \"fieldCount\": 0,\n                \"affectedRows\": 1,\n                \"insertId\": 0,\n                \"serverStatus\": 2,\n                \"warningCount\": 0,\n                \"message\": \"(Rows matched: 1  Changed: 1  Warnings: 0\",\n                \"protocol41\": true,\n                \"changedRows\": 1\n            }\n        }\n   }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err",
            "description": "<p>Devuelve &quot;1&quot; cuando ocurre un error en la consulta realizada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "{\n     \"err\": 1\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/unidades.js",
    "groupTitle": "Unidades"
  },
  {
    "type": "post",
    "url": "/resetPass",
    "title": "Cambiar Clave",
    "name": "resetPassword",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user",
            "description": "<p>Id del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Nueva clave del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "opass",
            "description": "<p>Clave vieja del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve true cuando se cambia la clave del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Success:",
          "content": "{\n        \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve false cuando se no puede cambiar la clave del usuario</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "info",
            "description": "<p>Devuelve el mensaje del error cuando la clave anterior no corresponde al usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Error 1",
          "content": "{\n        \"msg\": false\n}",
          "type": "json"
        },
        {
          "title": "Respuesta-Error 2",
          "content": "{\n        \"msg\": false,\n        \"info:\"La clave anterior no corresponde al usuario actual\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/generarAcceso",
    "title": "Generar Acceso a Usuario",
    "name": "getAcceso",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>Informacion dentro del cuerpo de la llamada (request) para generar Acceso. (EmpresasId, UsuariosId, RolesId, SocioId, Empresa, Usuario, logo)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Devuelve una cadena de caracteres con el token que le da el acceso al Usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"token\": \"[token]\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/usuarios.js",
    "groupTitle": "Usuarios"
  },
  {
    "type": "post",
    "url": "/generarVisita",
    "title": "Generar Acceso de Visita",
    "name": "getAccesoVisita",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "inicio",
            "description": "<p>Fecha y hora de inicio de la visita</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "fin",
            "description": "<p>Fecha y hora de expiracion de la visita</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "unidad",
            "description": "<p>Id de la unidad que sera rastreada en la visita</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "correo",
            "description": "<p>Correo del visitante</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "empresa",
            "description": "<p>Nombre de la empresa que genero el acceso</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "invitado",
            "description": "<p>Nombre de invitado</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve una true si el acceso fue generado exitosamente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": true\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "msg",
            "description": "<p>Devuelve una false si el acceso fue generado exitosamente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "{\n \"msg\": false\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/usuarios.js",
    "groupTitle": "Usuarios"
  },
  {
    "type": "get",
    "url": "/invitado?t=[token]",
    "title": "Obtener Invitado",
    "name": "getInvitado",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "t",
            "description": "<p>Token sacado del enlace</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/usuarios.js",
    "groupTitle": "Usuarios"
  },
  {
    "type": "get",
    "url": "/usuarios?empresaId=[id_empresa]",
    "title": "Listar Usuarios de Empresa",
    "name": "listarUsuarios",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "empresaId",
            "description": "<p>Id de la empresa del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Respuesta-Successs:",
          "content": "[\n {\n   \"usuario_id\": 1,\n   \"Usuario\": \"[nombre/correo]\",\n   \"rol_id\": 1,\n   \"Vigencia\": \"[fecha_vigencia]\",\n   \"Empresa\": \"[nombre_empresa]\",\n   \"empresa_id\": 1,\n   \"Rol\": \"[nombre_rol]\"\n }\n]",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Respuesta-Error:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/usuarios.js",
    "groupTitle": "Usuarios"
  }
] });
