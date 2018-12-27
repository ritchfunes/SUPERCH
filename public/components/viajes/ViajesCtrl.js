/**
 * Created by Roberto on 18/11/2015.
 */
var intervaloViajes;
SabuesoAPP.controller('ViajesCtrl',function($scope,$http,FactoryViaje,$timeout,$uibModal,$log,$interval){

    $timeout(function () {
        $('#viajeIda').show();
        $('#viajeIda').addClass('animated bounceInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#viajeIda').removeClass('animated bounceInDown');
        });
    },2000)
    $timeout(function () {
        $('#viajeRegreso').show();
        $('#viajeRegreso').addClass('animated bounceInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#viajeRegreso').removeClass('animated bounceInUp');
        });
    },2500)
    $timeout(function () {
        $('#right-bar').show();
        $('#right-bar').addClass('animated bounceInLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#right-bar').removeClass('animated bounceInUp');
        });
    },3300)



    $scope.listaViajes = [];/* = [
        {
        "Estado": 1,
        "Ventana": "2016-11-22 07:05:23",
        "Imei": 357666051318647,
        "Rastra": "",
        "kmInicial": 89540.882,
        "ida": 1,
        "ret": 2,
        "NombreViaje": "SPS - LCBA",
        "Velocidad": 50,
        "VelActual": 0,
        "Empresa": 66,
        "vehiculo": "VC01 AAT-1234",
        "Distancia": 210,
        "Origen": "Planta de Refrescos",
        "Destino": "La Ceiba",
        "kmActual": 90547.152,
        "Recorrido": 1006.2700000000041,
        "Avance": 60,
        "tiempoRestante":50,
        "cumpleVentana":1
    },
        {
        "Estado": 1,
        "Ventana": "2016-11-22 07:05:23",
        "Imei": 357666051318647,
        "Rastra": "",
        "kmInicial": 89540.882,
        "ida": 1,
        "ret": 2,
        "NombreViaje": "SPS - LCBA",
        "Velocidad": 50,
        "VelActual": 60,
        "Empresa": 66,
        "vehiculo": "VC20 AAT-1050",
        "Distancia": 210,
        "Origen": "Planta de Refrescos",
        "Destino": "La Ceiba",
        "kmActual": 90547.152,
        "Recorrido": 1006.2700000000041,
        "Avance": 60,
        "tiempoRestante":50,
        "cumpleVentana":1
    },
        {
        "Estado": 1,
        "Ventana": "2016-11-22 07:05:23",
        "Imei": 357666051318647,
        "Rastra": "",
        "kmInicial": 89540.882,
        "ida": 1,
        "ret": 2,
        "NombreViaje": "SPS - LCBA",
        "Velocidad": 50,
        "VelActual": 0,
        "Empresa": 66,
        "vehiculo": "VC01 AAT-1234",
        "Distancia": 210,
        "Origen": "Planta de Refrescos",
        "Destino": "La Ceiba",
        "kmActual": 90547.152,
        "Recorrido": 1006.2700000000041,
        "Avance": 82,
        "tiempoRestante":50,
        "cumpleVentana":0
    },
        {
        "Estado": 3,
        "Ventana": "2016-11-22 07:05:23",
        "Imei": 357666051318647,
        "Rastra": "",
        "kmInicial": 89540.882,
        "ida": 1,
        "ret": 2,
        "NombreViaje": "SPS - LCBA",
        "Velocidad": 50,
        "VelActual": 0,
        "Empresa": 66,
        "vehiculo": "VC01 AAT-1234",
        "Distancia": 210,
        "Origen": "Planta de Refrescos",
        "Destino": "La Ceiba",
        "kmActual": 90547.152,
        "Recorrido": 1006.2700000000041,
        "Avance": 70,
        "tiempoRestante":50,
        "cumpleVentana":1
    },
        {
        "Estado": 3,
        "Ventana": "2016-11-22 07:05:23",
        "Imei": 357666051318647,
        "Rastra": "",
        "kmInicial": 89540.882,
        "ida": 1,
        "ret": 2,
        "NombreViaje": "SPS - LCBA",
        "Velocidad": 50,
        "VelActual": 10,
        "Empresa": 66,
        "vehiculo": "VC42 AAT-5322",
        "Distancia": 210,
        "Origen": "Planta de Refrescos",
        "Destino": "La Ceiba",
        "kmActual": 90547.152,
        "Recorrido": 1006.2700000000041,
        "Avance": 45,
        "tiempoRestante":50,
        "cumpleVentana":0
    }];*/
    $scope.cumplenVentana = 0;
    $scope.noCumplenVentana = 0;

    $scope.cuentaIda = 0;
    $scope.cuentaRetorno = 0;



    if(intervaloViajes){
        $interval.cancel(intervaloViajes);
        console.log("hay un interval y lo cerramos");
    }

    intervaloViajes = $interval(function(){
        listarViajes();

    }, 30000,0,true,listarViajes());

    function listarViajes(){
        FactoryViaje.listaViajes().then(function(res){
            console.log(res.data);
            $scope.listaViajes = res.data;

            $scope.cumpleVentana();
            $scope.cuentaIdaRetorno();
        });

        FactoryViaje.viajesFinalizados().then(function(res){
            $scope.finalizados = res.data[0].Cantidad;
            $scope.noFinalizados = res.data[1].Cantidad;
        });

        FactoryViaje.uniSinTransf().then(function(res){
            $scope.uniSinTransf = res.data;
        });
    }

    $scope.cumpleVentana = function(){
        var cumplimiento =  _.countBy($scope.listaViajes,function(viaje){
            return viaje.cumpleVentana ==1?'cumple':'noCumple';
        });

        $scope.cumplenVentana = cumplimiento.cumple || 0;
        $scope.noCumplenVentana = cumplimiento.noCumple || 0;
    }

    $scope.cuentaIdaRetorno = function(){
        var cuenta =  _.countBy($scope.listaViajes,function(viaje){
            return viaje.Estado <= 2?'ida':'retorno';
        });

        $scope.cuentaIda = cuenta.ida || 0;
        $scope.cuentaRetorno = cuenta.retorno || 0;
    }

    $scope.getTimeFromMins = function (mins) {
        if(mins < 0)
            mins = mins * -1;
        // do not include the first validation check if you want, for example,
        // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
        //if (mins >= 24 * 60 || mins < 0) {
        //    throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
        //}
        var h = mins / 60 | 0,
            m = mins % 60 | 0;
        return moment.utc().hours(h).minutes(m).format("hh:mm");
    }



    $scope.modalDetalle = function(_viaje){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/viajes/viaje_detalle.html',
            controller:'modalViajeDetalle',
            size:'lg',
            resolve:{
                viaje:function(){

                    return _viaje;
                }
            }
        });

        modalInstance.result.then(function (alerta) {
            /*if (alerta == 0){
             listaAlertas = ultimasAlertas;
             }*/
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }

    $scope.ValidarBarra = function (avance) {
        if (!(typeof avance == "undefined")){
            if (avance > 100) {
                return 100;
            }
            else {
                return avance;
            }
        }
        return 0;
    }

    $scope.mostrarUbicacion = function(viaje){
        $.bootstrapGrowl(viaje.vehiculo + ": " +viaje.ubicacion, {type: 'info'});
    }

});

angular.module("Sabueso").controller('modalViajeDetalle', function ($scope, $uibModalInstance,$http,viaje,FactoryViaje) {

    $scope.tabladetalle = 1;
    $scope.viaje = viaje;
    $scope.detenciones = [];
    $scope.velocidades = {
        VelMax:0,
        VelPRom:0
    };
    $scope.eventos = [];

    $scope.viaje.observacion = "";

    var data = {
        imei:$scope.viaje.Imei,
        inicio:  localTimeToUtc(new Date($scope.viaje.FechaInicio))
    }

    FactoryViaje.viajesDetenciones(data).then(function (res) {
        $scope.detenciones = res.data;
    })

    FactoryViaje.viajesVelocidades(data).then(function (res) {
        $scope.velocidades = res.data[0];
    })

    FactoryViaje.viajesEventos(data).then(function (res) {
        //$scope.velocidades = res.data[0];
        $scope.eventos = res.data
    })


    FactoryViaje.viajesExcesos(data).then(function (res) {
        $scope.excesos = res.data;
    })


    var paramsTiempos = {
        transferenciaId: $scope.viaje.Transferencia
    }
    FactoryViaje.tiemposViaje(paramsTiempos).then(function (res) {
        $scope.tiemposViaje = res.data;
    })

    $scope.cancelarViaje = function(estado) {
        if ($scope.viaje.observacion == ""){
            $.bootstrapGrowl("Es necesario escribir un comentario sobre la cancelación del viaje", {type: 'warning'});
        }else{
            if (estado == 5){
                var data={
                    transferencia:$scope.viaje.Id_Transferencia,
                    observacion: $scope.viaje.observacion,
                    estado: estado
                };
                console.log(data);
                FactoryViaje.cancelarViaje(data).then(function(res){
                    if (res.status == 200){
                        $.bootstrapGrowl("El viaje ha sido cancelado!", {type: 'success'});
                    }
                    else{
                        $.bootstrapGrowl("Error! No se pudo cancelar", {type: 'danger'});
                    }

                    //delete $scope.viaje;
                });
            }
            if (estado == 4){
                if ($scope.viaje.Estado == 3){
                    //Terminar Viaje

                    var data={
                        transferencia:$scope.viaje.Id_Transferencia,
                        observacion: $scope.viaje.observacion,
                        estado: estado
                    };
                    console.log(data, $scope.viaje.Estado);
                    FactoryViaje.cancelarViaje(data).then(function(res){
                        if (res.status == 200){
                            $.bootstrapGrowl("El viaje se ha terminado!", {type: 'success'});
                        }
                        else{
                            $.bootstrapGrowl("Error! No se pudo terminar", {type: 'danger'});
                        }
                    });
                }else{
                    $.bootstrapGrowl("Error! No se puede Terminar un viaje que no esta en Retorno", {type: 'danger'});
                }
            }
        }
    };


    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
