/**
 * Created by Roberto on 24/07/2015.
 */
//var app = angular.module("Sabueso",[])

iconSelect = false;


SabuesoAPP.controller("ControllerReferencia",function($scope,$http,FactoryReferencias,ServicioReferencias,ServicioMapa,FactoryCrearCategoria,ServiceCategoria,$uibModal,$rootScope,$uibModalInstance)
{

    $scope.referenciasIcono = [];

    $scope.dataCategorias = {
        repeatSelect:"1"
    };

    $scope.availableOptions = function(){
        return ServiceCategoria.listaCategorias;
    };

    /*$scope.latitud = function(){
     return ServicioReferencias.latitud;
     }
     $scope.longitud = function (){
     return ServicioReferencias.longitud;
     }*/
    $scope.nombre ="";
    $scope.descripcion ="";
    $scope.visible = "1";
    $scope.Referencia="";


    $scope.init = function()
    {
        $scope.cargarIconos();
        $scope.cargarCategorias();
        $scope.latitud=ServicioReferencias.latitud;
        $scope.longitud=ServicioReferencias.longitud;
        $scope.dataCategorias = {
            id: ServiceCategoria.listaCategorias[0].id,
            Categoria: ServiceCategoria.listaCategorias[0].Categoria
        };
    };

    $scope.getReferencias=function(){
        return ServicioReferencias.ListaReferencias;
    };


    $scope.guardar = function(){
        data = {
            nombre:$scope.nombre,
            descripcion:$scope.descripcion,
            latitud:$scope.latitud,
            longitud:$scope.longitud,
            iconoId:iconSelect.getSelectedValue(),
            categoriaId:$scope.dataCategorias.id,
            visible:$scope.visible,
        };

        FactoryReferencias.guardar(data).then(function(d){
            if (d.data.msg == true)
            {
                nuevaFila ={
                    Id: d.data.info.id,
                    Nombre:$scope.nombre,
                    Descripcion:$scope.descripcion,
                    Latitud:$scope.latitud,
                    Longitud:$scope.longitud,
                    url:iconSelect.getSelectedFilePath(),
                    visibleCompuesto:$scope.visible == 1?"Si":"No",
                    CategoriaId:$scope.dataCategorias.id,
                    Categoria:$scope.dataCategorias.Categoria

                };

                ServicioReferencias.ListaReferencias.push(nuevaFila);
                //actualizarListaReferenciasCompuesto(nuevaFila);
                $scope.nombre ="";
                $scope.descripcion ="";
                $scope.latitud = "";
                $scope.longitud = "";
                $scope.visible = 1;
                //ServicioMapa.vista = "";

                //$("#modal-contenedor").modal("hide");
                $.bootstrapGrowl("Referencia Guardada!", {type: 'success'});
                $uibModalInstance.close();
            }
            else{
                $.bootstrapGrowl("Error! No se Pudo Guarda!", {type: 'danger'});
            }

        });


    };


    $scope.eliminar = function(elemento,idReferencia)
    {

        FactoryReferencias.eliminar({id:idReferencia,Nombre:elemento.Nombre}).then(function(d)
        {
            if(d.status==200){
                if (d.data.msg == true) {

                    var index = ServicioReferencias.ListaReferencias.indexOf(elemento);
                    ServicioReferencias.ListaReferencias.splice(index, 1);
                    ServicioReferencias.ListaReferenciasCompuesto.splice(index, 1);


                    $.bootstrapGrowl("Referencia borrada exitosamente!!!", {type: 'success', delay: 120000});


                }
                else{
                    $.bootstrapGrowl("Error,Referencia no se ha borrado", {type: 'danger',delay: 120000});
                }
            }else if(d.status==500){
                $.bootstrapGrowl("Error,Referencia no se ha borrado", {type: 'danger',delay: 120000});
            }
            else if(d.status==428){
                if(typeof d.data.msg==="undefined"){}else{
                    $.bootstrapGrowl(d.data.msg, {type: 'warning',delay: 120000});
                }
            }
        });

    };

    $scope.modificar=function(referencia,idReferencia){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/Referencias/vistaModificar.html',
            controller:'editarReferenciaCtrl',
            size:'lg',
            resolve:{
                referencia:function(){
                    return referencia;
                }
            }
        });
    };

    $scope.cargarIconos = function()
    {


        iconSelect = new IconSelect("my-icon-select");

        if ( ServicioReferencias.referenciasIcono.length > 0 )
        {
            console.log("nothing to do ");
            iconSelect.refresh(ServicioReferencias.referenciasIcono);
        }else{

            FactoryReferencias.iconosReferencias().then(function(d) {
                $.each(d.data.info, function (key, val) {
                    ServicioReferencias.referenciasIcono.push({'iconFilePath': val.url, 'iconValue': val.PK_ReferenciasIconosId});
                });
                iconSelect.refresh(ServicioReferencias.referenciasIcono);
            });
        }


    }

    $scope.cargarCategorias = function()
    {

        if(ServiceCategoria.listaCategorias.length == 0)
        {
            FactoryCrearCategoria.Obtenercategorias().then(function(d)
            {
                ServiceCategoria.listaCategorias = d.data.info;
            });
        }
    }


    //Funcion para listar las categorias en el modal
    $scope.listarCategorias = function()
    {

        if(ServiceCategoria.listaCategorias.length == 0)
        {
            FactoryCrearCategoria.Obtenercategorias().then(function(d)
            {
                ServiceCategoria.listaCategorias = d.data.info;
            });
        }


    }

    $scope.localizar = function(referencia){
        var lon = referencia.Longitud; //lon / puntos.length;
        var lat = referencia.Latitud; //lat / puntos.length;

        $rootScope.$broadcast('eventName', {lon: lon,lat: lat });
        $uibModalInstance.close(referencia);
    };



});

SabuesoAPP.controller("editarReferenciaCtrl", function($scope, referencia, $uibModalInstance, FactoryReferencias, ServicioReferencias,FactoryCrearCategoria,ServiceCategoria){
    $scope.init = function() {
        $scope.cargarIconos();
        $scope.cargarCategorias();
        console.log(referencia);
        $scope.nombre=referencia.Nombre;
        $scope.descripcion=referencia.Descripcion;
        $scope.latitud=referencia.Latitud;
        $scope.longitud=referencia.Longitud;
        $scope.dataCategorias = {
            id: referencia.CategoriaId,
            Categoria: referencia.Categoria
        };
        $scope.visible="1";
        if(referencia.visibleCompuesto=="Si"){
            $scope.visible="1";
        }else{
            $scope.visible="0";
        }
    };

    $scope.modificar= function () {
        var ref={
            id: referencia.Id,
            nombre: $scope.nombre,
            descripcion: $scope.descripcion,
            lat: $scope.latitud,
            lon: $scope.longitud,
            iconoId: iconSelect.getSelectedValue(),
            categoriaId: $scope.dataCategorias.id,
            visible: $scope.visible
        };
        console.log("info a modificar");
        console.log(ref);

        FactoryReferencias.modificar(ref).then(function (result) {
            //console.log(result);
            if(result.status==200){
                modRef=referencia;
                modRef['CategoriaId']=ref.categoriaId;
                modRef['Categoria']=$scope.dataCategorias.Categoria;
                modRef['Nombre']=ref.nombre;
                modRef['Descripcion']=ref.descripcion;
                modRef['url']= iconSelect.getSelectedFilePath();
                modRef['visibleCompuesto']= $scope.visible == 1?"Si":"No";
                modRef['Latitud']= parseFloat(ref.lat);
                modRef['Longitud']= parseFloat(ref.lon);

                index=ServicioReferencias.ListaReferencias.indexOf(referencia);
                console.log(modRef);
                ServicioReferencias.ListaReferencias[index]=modRef;
                $.bootstrapGrowl("Referencia Modificada Exitosamente!", {type: 'success',delay: 120000});
                $uibModalInstance.close();
            }else{
                $.bootstrapGrowl("Error, Referencia no se modifico", {type: 'danger',delay: 120000});
            }
        });
    };

    $scope.cargarIconos = function() {
        iconSelect = new IconSelect("my-icon-select");

        if ( ServicioReferencias.referenciasIcono.length > 0 )
        {
            console.log("nothing to do ");
            iconSelect.refresh(ServicioReferencias.referenciasIcono);
            selectedIndex=0;
            for(i=0;i<ServicioReferencias.referenciasIcono.length;i++){
                if(ServicioReferencias.referenciasIcono[i]['iconFilePath']==referencia.url){
                    selectedIndex=i;
                }
            }
            iconSelect.setSelectedIndex(selectedIndex);
        }else{

            FactoryReferencias.iconosReferencias().then(function(d) {
                $.each(d.data.info, function (key, val) {
                    ServicioReferencias.referenciasIcono.push({'iconFilePath': val.url, 'iconValue': val.PK_ReferenciasIconosId});
                });
                iconSelect.refresh(ServicioReferencias.referenciasIcono);
                selectedIndex=0;
                for(i=0;i<ServicioReferencias.referenciasIcono.length;i++){
                    if(ServicioReferencias.referenciasIcono[i]['iconFilePath']==referencia.url){
                        selectedIndex=i;
                    }
                }
                iconSelect.setSelectedIndex(selectedIndex);
            });
        }


    };

    $scope.cargarCategorias = function() {
        if(ServiceCategoria.listaCategorias.length == 0)
        {
            FactoryCrearCategoria.Obtenercategorias().then(function(d)
            {
                ServiceCategoria.listaCategorias = d.data.info;
            });
        }
    };

    $scope.availableOptions = function(){
        return ServiceCategoria.listaCategorias;
    };

    //Funcion para listar las categorias en el modal
    $scope.listarCategorias = function() {
        if(ServiceCategoria.listaCategorias.length == 0)
        {
            FactoryCrearCategoria.Obtenercategorias().then(function(d)
            {
                ServiceCategoria.listaCategorias = d.data.info;
            });
        }


    };
});