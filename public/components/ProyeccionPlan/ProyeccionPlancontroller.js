SabuesoAPP.controller("ProyeccionPlanCtrl",function($scope,  FactoryProyeccionPlan,ServiceProyeccionPlan, $uibModal)
{

    $scope.cambiofecha = function()
    {
      $scope.Filtrofecha = moment($scope.Filtrofecha).format('YYYY-MM-DD')
      console.log($scope.Filtrofecha) ;
  
    }
    

  //Editar estado unidad
  $scope.modificarProyeccionPlan = function(proyeccionplan){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/ProyeccionPlan/editProyeccionPlan.html',
     controller: 'editarproyeccionplanCtrl',
      size:'lg',
      resolve: {
        proyeccionplan: function(){
          return proyeccionplan;
        }
      }
    });

    modalInstance.result.then(function(newproyeccionplan){
        console.log(newproyeccionplan) ; 
      if(typeof newproyeccionplan !== 'undefined'){
        idx = _.findIndex(ServiceProyeccionPlan.listaProyeccionPlan, proyeccionplan );
        ServiceProyeccionPlan.listaProyeccionPlan[idx] = newproyeccionplan;
      }
    });        
 

}

    $scope.showform = function(){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/ProyeccionPlan/createProyeccionPlan.html',
            controller: 'guardarProyeccionPlanctrl',
            size:'lg',
            resolve: {
              funcion: function(){
                return [];
              }
            }
          });
    
        modalInstance.result.then(function(){
            ServiceProyeccionPlan.listaProyeccionPlan = [];
            $scope.listarProyeccionPlan();
        });
    }
    

        
 $scope.eliminarproyeccionPlan = function(elemento, idProyeccionPlan)
 {
    FactoryProyeccionPlan.eliminar({PK_Plan:idProyeccionPlan}).then(function(d)
     {
         if(d.data.msg == true){
 
             var index = ServiceProyeccionPlan.listaProyeccionPlan.indexOf(elemento);
             ServiceProyeccionPlan.listaProyeccionPlan.splice(index,1);
             ServiceProyeccionPlan.listaProyeccionPlan = [];
             $scope.listarProyeccionPlan() ; 
 
             $.bootstrapGrowl("proyeccion plan inactivada exitosamente!!!", {type: 'success',delay: 120000});
         }
         else{
             $.bootstrapGrowl("Error,plan no se ha podido ejecutar", {type: 'danger',delay: 120000});
         }
     });
 }
 

    
 
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarProyeccionPlan = function()
  {
    if(ServiceProyeccionPlan.listaProyeccionPlan.length == 0)
    {
        FactoryProyeccionPlan.getProyeccionPlan().then( function(d) {
            ServiceProyeccionPlan.listaProyeccionPlan = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  


  $scope.listaProyeccionPlan = function()
  {
      return ServiceProyeccionPlan.listaProyeccionPlan;
  }

}) ;




SabuesoAPP.controller('guardarProyeccionPlanctrl', function($scope, $uibModalInstance, ServiceProyeccionPlan, FactoryProyeccionPlan)
{



    $scope.listaViajeCompleto = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceProyeccionPlan.listaViajeCompleto;
    }
  

    $scope.listaProyeccionPlan = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceProyeccionPlan.listaProyeccionPlan;
    }



    $scope.init= function () {
        FactoryProyeccionPlan.ObtenerViajeCompleto().then(function (res) {
            if(res.data.msg==true){
                ServiceProyeccionPlan.listaViajeCompleto=res.data.info;
            }
        });

        //Parametros
        $scope.ProyeccionPlanFecha;
        $scope.ProyeccionPlanTotalUnidades;
        $scope.ProyeccionPlanRecarga  ;
        $scope.ProyeccionPlanCantidadRecarga ;
        $scope.ProyeccionPlanDestino ;
        $scope.ProyeccionPlanDia ;
        


        $scope.dias = [{
            id: 0,
            dia: "Domingo"
        }, {
            id: 1,
            dia: "Lunes"
        },{
            id: 2,
            dia: "Martes"
        },{
            id: 3,
            dia: "Miercoles"
        },{
            id: 4,
            dia: "Jueves"
        },{
            id: 5,
            dia: "Viernes"
        },{
            id: 6,
            dia: "Sabado"
        } ];

    };

 
    $scope.guardarProyeccionplan = function(){

        var data = {
            Destino:$scope.ProyeccionPlanDestino.Nombre ,
            FK_ViajeCompleto:$scope.ProyeccionPlanDestino.ViajeCompletoId ,
            Fecha:moment($scope.ProyeccionPlanFecha).format('YYYY-MM-DD'),
          //  Dia:$scope.ProyeccionPlanDia.dia , 
          Dia: $scope.ProyeccionPlanDia , 
            TotalUnidades:$scope.ProyeccionPlanTotalUnidades , 
            Recarga:$scope.ProyeccionPlanRecarga , 
            CantidadRecarga: $scope.ProyeccionPlanCantidadRecarga , 
        //    FK_ViajeCompleto: $scope.ProyeccionPlanDestino.ViajeCompletoId  , 
            Activo: 1 
    
    
        };
    
        console.log(data) ;
        FactoryProyeccionPlan.guardar(data).then( function(d) {
    
            if( d.data.msg == true )
            {
                data = {
                    Destino:$scope.ProyeccionPlanDestino.Nombre ,
                    FK_ViajeCompleto:$scope.ProyeccionPlanDestino.ViajeCompletoId ,
                    Fecha:moment($scope.ProyeccionPlanFecha).format('YYYY-MM-DD'),
                    Dia:$scope.ProyeccionPlanDia.dia , 
                    TotalUnidades:$scope.ProyeccionPlanTotalUnidades , 
                    Recarga:$scope.ProyeccionPlanRecarga , 
                    CantidadRecarga: $scope.ProyeccionPlanCantidadRecarga , 
                    FK_ViajeCompleto: $scope.ProyeccionPlanDestino.Nombre  , 
                    Activo: 1 
            
                };
                
                $.bootstrapGrowl("proyeccion plan unidades guardado exitosamente!!!", {type: 'success',delay: 120000});
    
                $scope.ProyeccionPlanFecha = " ";
        $scope.ProyeccionPlanTotalUnidades = " ";
        $scope.ProyeccionPlanRecarga = " " ;
        $scope.ProyeccionPlanCantidadRecarga = " " ;
        $scope.ProyeccionPlanDestino = " " ;
        $scope.ProyeccionPlanDia = " ";
                
                $uibModalInstance.close();
                
               
                
      
            }
            else {
                $.bootstrapGrowl("Error,Proyeccion plan unidades no se ha guardado", {type: 'danger',delay: 120000});
    
            };
    
        });
    }
    


}) ;


SabuesoAPP.controller("editarproyeccionplanCtrl", function($scope,  $uibModalInstance, $uibModal, proyeccionplan,  FactoryProyeccionPlan, ServiceProyeccionPlan )
{
   


    $scope.editarproyeccionplan = function(){
        $scope.proyeccionplan.Fecha = moment($scope.proyeccionplan.Fecha).format('YYYY-MM-DD'),
            
            data = {
    
                PK_Plan: $scope.proyeccionplan.PK_Plan,
                Destino: $scope.dataViajes.Nombre,
                FK_ViajeCompleto: $scope.dataViajes.ViajeCompletoId,
                Dia: $scope.proyeccionplan.Dia,
                Fecha: $scope.proyeccionplan.Fecha,
                TotalUnidades: $scope.proyeccionplan.TotalUnidades, 
                Recarga: $scope.proyeccionplan.Recarga, 
                CantidadRecarga: $scope.proyeccionplan.CantidadRecarga, 
                Activo: 1
            }
    
            console.log(data) ;
    
         //   data = deleteEmptyFields(data);
    
         FactoryProyeccionPlan.editar(data).then(function(res){
                if(res.status == 200){
    
                    if(data.Activo == 1)
                    {
                        $scope.proyeccionplan['Activo'] = "activo" ;
                    }
                    else {
                        $scope.proyeccionplan['Activo'] = "inactivo" ;
                    }
                    $.bootstrapGrowl("proyeccion plan editado exitosamente!", {type: 'success',delay: 10000});
                    $uibModalInstance.close($scope.proyeccionplan);
                    ServiceProyeccionPlan.listaProyeccionPlan = [];
                    $scope.listarProyeccionPlan() ; 
                    
                }
                 else {
                    $.bootstrapGrowl("Error editar proyeccion plan", {type: 'danger',delay: 10000});
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
  



    $scope.listaViajeCompleto = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceProyeccionPlan.listaViajeCompleto;
    }

    $scope.listaProyeccionPlan = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceProyeccionPlan.listaProyeccionPlan;
    }


    $scope.listarProyeccionPlan = function()
    {
      if(ServiceProyeccionPlan.listaProyeccionPlan.length == 0)
      {
          FactoryProyeccionPlan.getProyeccionPlan().then( function(d) {
              ServiceProyeccionPlan.listaProyeccionPlan = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      }
  
    }
  

    
    $scope.init = function(){

        $scope.proyeccionplan = proyeccionplan;
        $scope.proyeccionplan.Fecha = new Date($scope.proyeccionplan.Fecha+" 00:00:00");
        $scope.proyeccionplan.Activo = 1 ;
      
        
        $scope.dias = [{
            id: 0,
            dia: "Domingo"
        }, {
            id: 1,
            dia: "Lunes"
        },{
            id: 2,
            dia: "Martes"
        },{
            id: 3,
            dia: "Miercoles"
        },{
            id: 4,
            dia: "Jueves"
        },{
            id: 5,
            dia: "Viernes"
        },{
            id: 6,
            dia: "Sabado"
        } ];

          
        FactoryProyeccionPlan.ObtenerViajeCompleto().then(function (res) {
            if(res.data.msg==true){
                ServiceProyeccionPlan.listaViajeCompleto=res.data.info;
            }
        });
        
        $scope.dataViajes = {
            ViajeCompletoId: proyeccionplan.FK_ViajeCompleto,
            Nombre: proyeccionplan.Nombre
        };
        


    }


}) ;