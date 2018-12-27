
SabuesoAPP.controller("proyeccionPlanunidadesCtrl",function($scope,  FactoryCrearproyeccionPlanunidades,Serviceproyeccionplanunidades, $uibModal)
{

    $scope.cambiofecha = function()
    {
      $scope.Filtrofecha = moment($scope.Filtrofecha).format('YYYY-MM-DD')
  
    }

      //Editar estado unidad
  $scope.modificarPlanUnidades = function(planunidades){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/proyeccionplanunidades/editproyeccionplanunidades.html',
     controller: 'editarproyeccionplanunidadesCtrl',
      size:'lg',
      resolve: {
        planunidades: function(){
          return planunidades;
        }
      }
    });


    modalInstance.result.then(function(newplanunidades){
        console.log(newplanunidades) ; 
      if(typeof newplanunidades !== 'undefined'){
        idx = _.findIndex(Serviceproyeccionplanunidades.listaproyeccionplanunidades, planunidades );
        Serviceproyeccionplanunidades.listaproyeccionplanunidades[idx] = newplanunidades;
      }
    });        
 
}




    $scope.showform = function(){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/proyeccionplanunidades/createplanunidades.html',
            controller: 'guardarproyeccionPlanunidadctrl',
            size:'lg',
            resolve: {
              funcion: function(){
                return [];
              }
            }
          });
    
        modalInstance.result.then(function(){
            Serviceproyeccionplanunidades.listaproyeccionplanunidades = [];
            $scope.listarProyeccionplanunidades();
        });
    }
    

 
    $scope.eliminarPlanunidad = function(elemento, idplanunidades)
    {
        FactoryCrearproyeccionPlanunidades.eliminar({PK_PlanUnidades:idplanunidades}).then(function(d)
        {
            if(d.data.msg == true){
    
                var index = Serviceproyeccionplanunidades.listaproyeccionplanunidades.indexOf(elemento);
                Serviceproyeccionplanunidades.listaproyeccionplanunidades.splice(index,1);
                Serviceproyeccionplanunidades.listaproyeccionplanunidades = [];
                $scope.listarProyeccionplanunidades() ; 
    
                $.bootstrapGrowl("plan de unidad inactiva exitosamente!!!", {type: 'success',delay: 120000});
            }
            else{
                $.bootstrapGrowl("Error,plan unidad no se ha inactivada", {type: 'danger',delay: 120000});
            }
        });
    }
    

      //Funcion para listar loa Estadosunidades en el modal
  $scope.listarProyeccionplanunidades = function()
  {
    if(Serviceproyeccionplanunidades.listaproyeccionplanunidades.length == 0)
    {
        FactoryCrearproyeccionPlanunidades.getplanunidades().then( function(d) {
            Serviceproyeccionplanunidades.listaproyeccionplanunidades = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaProyeccionplanunidades = function()
  {
      return Serviceproyeccionplanunidades.listaproyeccionplanunidades;
  }





})



SabuesoAPP.controller('guardarproyeccionPlanunidadctrl', function($scope, $uibModalInstance, Serviceproyeccionplanunidades, FactoryCrearproyeccionPlanunidades)
{


    $scope.listaEstados = function()
  {
      //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
      return Serviceproyeccionplanunidades.listaEstados;
  }


    $scope.init= function () {
        FactoryCrearproyeccionPlanunidades.Obtenerplanunidades().then(function (res) {
            if(res.data.msg==true){
                Serviceproyeccionplanunidades.listaEstados=res.data.info;
            }
        });

        //Parametros
        $scope.planUnidadFK_Estado;
        $scope.planUnidadCantidad;
        $scope.planUnidadFecha  ;
        $scope.planUnidadCabezal ;


        $scope.estados = [{
            id: 0,
            estadocabezal: "Furgon"
        }, {
            id: 1,
            estadocabezal: "Cabezal"
        }];

    };




    
  $scope.guardarProyeccionplanunidades = function(){

    var data = {
        FK_Estado:$scope.planUnidadFK_Estado.PK_Estado ,
        Fecha:moment($scope.planUnidadFecha).format('YYYY-MM-DD'),
        Cantidad:$scope.planUnidadCantidad , 
        Cabezal: $scope.planUnidadCabezal , 
        Activo: 1 


    };

    FactoryCrearproyeccionPlanunidades.guardar(data).then( function(d) {

        if( d.data.msg == true )
        {
            data = {
                FK_Estado:$scope.planUnidadFK_Estado.PK_Estado,
                Fecha:moment($scope.planUnidadFecha).format('YYYY-MM-DD'),
                Cantidad:$scope.planUnidadCantidad , 
                Cabezal:  $scope.planUnidadCabezal , 
                Activo: 1 

            };
            
            $.bootstrapGrowl("proyeccion plan unidades guardado exitosamente!!!", {type: 'success',delay: 120000});

            $scope.planUnidadFecha = "" ; 
            $scope.planUnidadFK_Estado = "" ; 
            $scope.planUnidadCantidad = "" ; 
            $scope.planUnidadCabezal = "" ; 
            
            $uibModalInstance.close();
            
           
            
  
        }
        else {
            $.bootstrapGrowl("Error,Proyeccion plan unidades no se ha guardado", {type: 'danger',delay: 120000});

        };

    });
}



})



SabuesoAPP.controller("editarproyeccionplanunidadesCtrl", function($scope,  $uibModalInstance, $uibModal, planunidades,  FactoryCrearproyeccionPlanunidades, Serviceproyeccionplanunidades )
{
   
  
    $scope.listaProyeccionplanunidades = function()
    {
        return Serviceproyeccionplanunidades.listaproyeccionplanunidades;
    }
  


    $scope.listarProyeccionplanunidades = function()
    {
      if(Serviceproyeccionplanunidades.listaproyeccionplanunidades.length == 0)
      {
          FactoryCrearproyeccionPlanunidades.getplanunidades().then( function(d) {
              Serviceproyeccionplanunidades.listaproyeccionplanunidades = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      }
  
    }



    $scope.listaEstados = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceproyeccionplanunidades.listaEstados;
    }
  

    $scope.editarplanUnidades = function(){
        $scope.planunidades.Fecha = moment($scope.planunidades.Fecha).format('YYYY-MM-DD'),
            
            data = {
    
                PK_PlanUnidades: $scope.planunidades.PK_PlanUnidades,
                FK_Estado: $scope.dataEstados.PK_Estado,
                Cantidad: $scope.planunidades.Cantidad,
                Fecha: $scope.planunidades.Fecha,
                Cabezal: $scope.planunidades.Cabezal, 
                Activo: 1
            }
    
            console.log(data) ;
    
         //   data = deleteEmptyFields(data);
    
         FactoryCrearproyeccionPlanunidades.editar(data).then(function(res){
                if(res.status == 200){
    
                    if(data.Activo == 1)
                    {
                        $scope.planunidades['Activo'] = "activo" ;
                    }
                    else {
                        $scope.planunidades['Activo'] = "inactivo" ;
                    }
                    $.bootstrapGrowl("plan Unidades editado exitosamente!", {type: 'success',delay: 10000});
                    $uibModalInstance.close($scope.planunidades);
                    Serviceproyeccionplanunidades.listaproyeccionplanunidades = [];
                    $scope.listarProyeccionplanunidades() ; 
                    
                }
                 else {
                    $.bootstrapGrowl("Error editar plan Unidades", {type: 'danger',delay: 10000});
                }
            });
        }
    
       
    
    
        function deleteEmptyFields(data){
            for(key in data){
                if(typeof data[key] === 'undefined' || data[key] === '' || data[key] == null || data[key] === 'Invalid date'){
                    delete data[key];
                }
            }
            return data;
        }
    


    
    $scope.init = function(){


        $scope.planunidades = planunidades;
     
        $scope.planunidades.Fecha = new Date($scope.planunidades.Fecha+" 00:00:00");


      $scope.planunidades.Activo = 1 ;
        if($scope.planunidades.Cabezal == "Cabezal")
        {
            $scope.planunidades.Cabezal = 1 ;
        }
        else 
        {
            $scope.planunidades.Cabezal = 0 ;
        }

        
        $scope.estadoscabezal = [{
            id: 0,
            estado: "Furgon"
        }, {
            id: 1,
            estado: "Cabezal"
        }];

        FactoryCrearproyeccionPlanunidades.Obtenerplanunidades().then(function (res) {
            if(res.data.msg==true){
                Serviceproyeccionplanunidades.listaEstados=res.data.info;
            }
        });

        
        $scope.dataEstados = {
            PK_Estado: planunidades.PK_Estado,
            Estado: planunidades.Estado
        };

    }

    
})


