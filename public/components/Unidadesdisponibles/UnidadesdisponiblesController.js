

SabuesoAPP.controller("unidadesdisponiblesCtrl",function($scope,  FactoryCrearunidadesDisponibles,Serviceunidadesdisponibles, $uibModal)
{

    $scope.cambiofecha = function()
    {
        $scope.Filtrofecha = moment($scope.Filtrofecha).format('YYYY-MM-DD')
  
    }

    $scope.cambiofechasemana = function()
    {
        console.log(moment($scope.Filtrofecha).format('WW') - 1) 
        console.log($scope.Filtrofecha) ;
        $scope.listarDisponibilidadunidadessemanal() ;   
    }
    
    $scope.guardarunidadesdisponibles = function(){
       
        FactoryCrearunidadesDisponibles.insertarDisponibilidadunidadessemanal().then(function(d)
        {        
               $.bootstrapGrowl("unidades sincronizdas exitosamente!!!", {type: 'success',delay: 120000});
                   
        });
         
    }
  


      //Editar estado unidad
      $scope.modificarUnidadesdisponibles = function(unidadesdisponibles){
        var modalInstance = $uibModal.open({
          animation:true,
          templateUrl: 'components/Unidadesdisponibles/editunidadesdisponibles.html',
         controller: 'editarunidadesdisponiblesCtrl',
          size:'lg',
          resolve: {
            unidadesdisponibles: function(){
              return unidadesdisponibles;
            }
          }
        });
    
    
        modalInstance.result.then(function(newunidadesdisponibles){
            console.log(newunidadesdisponibles) ; 
          if(typeof newunidadesdisponibles !== 'undefined'){
            idx = _.findIndex(Serviceunidadesdisponibles.listaUnidadesdisponibles, unidadesdisponibles );
            Serviceunidadesdisponibles.listaUnidadesdisponibles[idx] = newunidadesdisponibles;
          }
        });        
     
    }
    
    


    $scope.showform = function(){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Unidadesdisponibles/createunidadesdisponibles.html',
            controller: 'guardarunidadesdisponiblesctrl',
            size:'lg',
            resolve: {
              funcion: function(){
                return [];
              }
            }
          });
    
        modalInstance.result.then(function(){
            Serviceunidadesdisponibles.listaUnidadesdisponibles = [];
            $scope.listarUnidadesdisponibles();
        });
    }
    




    $scope.eliminarUnidadesdisponible = function(elemento, idunidadesdisponibles)
    {
        FactoryCrearunidadesDisponibles.eliminar({PK_UnidadesDisponibles:idunidadesdisponibles}).then(function(d)
        {
            if(d.data.msg == true){
    
                var index = Serviceunidadesdisponibles.listaUnidadesdisponibles.indexOf(elemento);
                Serviceunidadesdisponibles.listaUnidadesdisponibles.splice(index,1);
                Serviceunidadesdisponibles.listaUnidadesdisponibles = [];
                $scope.listarUnidadesdisponibles() ; 
    
                $.bootstrapGrowl("unidad disponible inactiva exitosamente!!!", {type: 'success',delay: 120000});
            }
            else{
                $.bootstrapGrowl("Error,unidad disponible no se ha inactivada", {type: 'danger',delay: 120000});
            }
        });
    }
    



    $scope.listarDisponibilidadunidadessemanal = function( )
    {
 
        var data = {
            Semana:  moment($scope.Filtrofecha).format('WW') - 1  
            
          };
       
          console.log(data) ; 
          var m = moment($scope.Filtrofecha).locale('es'); // moment();
        //  m = m.lang('es') ; 
          var start = m.startOf('week').format('DD')
          var  end = m.endOf('week').format('DD')
          var month = m.endOf('week').format('MMMM')
          var monthini = m.startOf('week').format('MMMM')
           console.log("de: "+start+ " hasta: "+ end) ;
           $scope.diainiciosemana =  start ;
          var  end = m.endOf('week').format('DD')
           $scope.diafinsemana =  end ;
           $scope.mes = month ;
           $scope.mesini = monthini ;
           
          FactoryCrearunidadesDisponibles.getDisponibilidadunidadessemanal(data).then( function(d) {
            Serviceunidadesdisponibles.listaDisponibilidadunidadessemanal = [] ;
            Serviceunidadesdisponibles.listaDisponibilidadunidadessemanal = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      
    }
    
      //Funcion para listar loa Estadosunidades en el modal
  $scope.listarUnidadesdisponibles = function()
  {

    if(Serviceunidadesdisponibles.listaUnidadesdisponibles.length == 0)
    {
        FactoryCrearunidadesDisponibles.getunidadesdisponible().then( function(d) {
            Serviceunidadesdisponibles.listaUnidadesdisponibles = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaUnidadesdisponibles = function()
  {
      return Serviceunidadesdisponibles.listaUnidadesdisponibles;
  }

  $scope.listaDisponibilidadunidadessemanal = function()
  {
      return Serviceunidadesdisponibles.listaDisponibilidadunidadessemanal;
  }


  $scope.listarDisponibilidadunidadesonline = function()
  {

    if(Serviceunidadesdisponibles.listaDisponibilidadunidadesonline.length == 0)
    {
        FactoryCrearunidadesDisponibles.getunidadesdisponiblesonline().then( function(d) {
            Serviceunidadesdisponibles.listaDisponibilidadunidadesonline = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }



  $scope.listaDisponibilidadunidadesonline = function()
  {
      return Serviceunidadesdisponibles.listaDisponibilidadunidadesonline;
  }


})




SabuesoAPP.controller('guardarunidadesdisponiblesctrl', function($scope, $uibModalInstance, Serviceunidadesdisponibles, FactoryCrearunidadesDisponibles)
{


    $scope.listaEstados = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceunidadesdisponibles.listaEstados;
    }


    $scope.listaUnidades = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceunidadesdisponibles.listaUnidades;
    }


    

    $scope.test= function () {
    
        $scope.unidaddisponibleFechaEntrega = new Date("1900-01-01");
    };

    $scope.guardarunidadesdisponibles = function(){

      
        var data = {

            FK_Estado:$scope.unidaddisponibleFK_Estado.PK_Estado ,
            FechaEntregad: $scope.unidaddisponibleFechaEntrega ,
            
            FechaEntrega:moment($scope.unidaddisponibleFechaEntrega).format('YYYY-MM-DD'),
         //   FechaEntrega: null,
            FechaAsignacion:moment($scope.unidaddisponibleFechaAsignacion).format('YYYY-MM-DD'),
            FK_Unidades:$scope.unidaddisponibleFK_Unidades.UnidadId , 
            Estado:$scope.unidaddisponibleFK_Estado.Estado , 
            Comentario:$scope.unidaddisponibleComentario , 
            FK_Empresa: 74 , 
            Activo: 1 
    
        };
    
        console.log(data) ;
        FactoryCrearunidadesDisponibles.guardar(data).then( function(d) {
    
            if( d.data.msg == true )
            {
                data = {
             
                    FK_Estado:$scope.unidaddisponibleFK_Estado.PK_Estado ,
                    FechaEntrega:moment($scope.unidaddisponibleFechaEntrega).format('YYYY-MM-DD'),
                 //   FechaEntrega: null,
                   FechaAsignacion:moment($scope.unidaddisponibleFechaAsignacion).format('YYYY-MM-DD'),
                    FK_Unidades:$scope.unidaddisponibleFK_Unidades.UnidadId , 
                    Estado:$scope.unidaddisponibleFK_Estado.Estado , 
                    Comentario:$scope.unidaddisponibleComentario , 
                    FK_Empresa: 74 , 
                    Activo: 1 
    
                };
                
                $.bootstrapGrowl("unidades disponibles guardado exitosamente!!!", {type: 'success',delay: 120000});
    
            
                $uibModalInstance.close();
                
               
                
      
            }
            else {
                $.bootstrapGrowl("Error,unidades disponibles no se ha guardado", {type: 'danger',delay: 120000});
    
            };
    
        });
    }
    


    $scope.init= function () {

        //Parametros
        $scope.unidaddisponibleFK_Unidades;
        $scope.unidaddisponibleFK_Estado;
        $scope.unidaddisponibleEstado  ;
        $scope.unidaddisponibleComentario ;
        $scope.unidaddisponibleFechaEntrega ;
        $scope.unidaddisponibleFechaAsignacion ;
      //  $scope.unidaddisponibleFechaAsignacion ;

      $scope.unidaddisponibleFechaEntrega = new Date("1900-01-01");
        FactoryCrearunidadesDisponibles.Obtenerestadosunidades().then(function (res) {
            if(res.data.msg==true){
                Serviceunidadesdisponibles.listaEstados=res.data.info;
             //   console.log(data);
            }
        });

        FactoryCrearunidadesDisponibles.Obtenereunidades().then(function (res) {
            if(res.data.msg==true){
                Serviceunidadesdisponibles.listaUnidades=res.data.info;
           //     console.log(data);
            }
        });
       

    };



    
})



SabuesoAPP.controller("editarunidadesdisponiblesCtrl", function($scope,  $uibModalInstance, $uibModal, unidadesdisponibles,  FactoryCrearunidadesDisponibles, Serviceunidadesdisponibles )
{


 
    $scope.editarUnidadesdisponibles = function(){
        $scope.unidadesdisponibles.FechaAsignacion = moment($scope.unidadesdisponibles.FechaAsignacion).format('YYYY-MM-DD'),
        $scope.unidadesdisponibles.FechaEntrega = moment($scope.unidadesdisponibles.FechaEntrega).format('YYYY-MM-DD'),
            
            data = {   
                PK_UnidadesDisponibles: $scope.unidadesdisponibles.PK_UnidadesDisponibles,
                FK_Estado: $scope.dataEstados.PK_Estado,
                Estado: $scope.dataEstados.Estado,
                FK_Unidades: $scope.dataUnidades.UnidadId,
                Comentario: $scope.unidadesdisponibles.Comentario,
                FechaEntrega: $scope.unidadesdisponibles.FechaEntrega,
                FechaAsignacion: $scope.unidadesdisponibles.FechaAsignacion, 
                FK_Empresa: $scope.unidadesdisponibles.FK_Empresa, 
                Activo: 1
            }
    
            console.log(data) ;
    
         //   data = deleteEmptyFields(data);
    
         FactoryCrearunidadesDisponibles.editar(data).then(function(res){
                if(res.status == 200){
    
                    if(data.Activo == 1)
                    {
                        $scope.unidadesdisponibles['Activo'] = "activo" ;
                    }
                    else {
                        $scope.unidadesdisponibles['Activo'] = "inactivo" ;
                    }
                    $.bootstrapGrowl("Unidad disponible editado exitosamente!", {type: 'success',delay: 10000});
                    $uibModalInstance.close($scope.unidadesdisponibles);
                    Serviceunidadesdisponibles.listaUnidadesdisponibles = [];
                    $scope.listarUnidadesdisponibles() ; 
                    
                }
                 else {
                    $.bootstrapGrowl("Error al modificar unidad", {type: 'danger',delay: 10000});
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
    


    $scope.listaUnidades = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceunidadesdisponibles.listaUnidades;
    }


    $scope.listaEstados = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceunidadesdisponibles.listaEstados;
    }


    $scope.listaUnidades = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return Serviceunidadesdisponibles.listaUnidades;
    }

    
    $scope.init = function(){


        $scope.unidadesdisponibles = unidadesdisponibles;
     
        $scope.unidadesdisponibles.FechaAsignacion = new Date($scope.unidadesdisponibles.FechaAsignacion);
        $scope.unidadesdisponibles.FechaEntrega = new Date($scope.unidadesdisponibles.FechaEntrega);


      $scope.unidadesdisponibles.Activo = 1 ;
      
      FactoryCrearunidadesDisponibles.Obtenereunidades().then(function (res) {
        if(res.data.msg==true){
            Serviceunidadesdisponibles.listaUnidades=res.data.info;
       //     console.log(data);
        }
    });
   

        
      FactoryCrearunidadesDisponibles.Obtenerestadosunidades().then(function (res) {
        if(res.data.msg==true){
            Serviceunidadesdisponibles.listaEstados=res.data.info;
         //   console.log(data);
        }
    });
   
    
        $scope.dataEstados = {
            PK_Estado: unidadesdisponibles.FK_Estado,
            Estado: unidadesdisponibles.Estado
        };
 

        $scope.dataUnidades = {
            UnidadId: unidadesdisponibles.FK_Unidades,
       //  UnidadId: unidadesdisponibles.UnidadId,
            NombreCompleto: unidadesdisponibles.NombreCompleto
        };


    }


    
      //Funcion para listar loa Estadosunidades en el modal
  $scope.listarUnidadesdisponibles = function()
  {

    if(Serviceunidadesdisponibles.listaUnidadesdisponibles.length == 0)
    {
        FactoryCrearunidadesDisponibles.getunidadesdisponible().then( function(d) {
            Serviceunidadesdisponibles.listaUnidadesdisponibles = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaUnidadesdisponibles = function()
  {
      return Serviceunidadesdisponibles.listaUnidadesdisponibles;
  }


})

