SabuesoAPP.controller("CategoriaController",function($scope,FactoryCrearCategoria,ServiceCategoria)
{



    //Parametros
    $scope.nombreCategoria;
    $scope.descripcionCategoria;

    
    //Arreglo Para Listar las categorias
    //$scope.listaCategorias = [];

    //Funcion para guardar la categoria
    $scope.guardarCategoria = function(){

        var data = {
            categoria:$scope.nombreCategoria,
            descripcion:$scope.descripcionCategoria
        };


        FactoryCrearCategoria.guardar(data).then(function(d){

            if (d.data.msg == true) {

            data = {
                categoria:$scope.nombreCategoria,
                descripcion:$scope.descripcionCategoria
            };
                $.bootstrapGrowl("Categoria guardada exitosamente!!!", {type: 'success',delay: 120000});

                $scope.nombreCategoria = "";
                $scope.descripcionCategoria = "";
                ServiceCategoria.listaCategorias = [];
                $scope.listarCategorias();

            }else{

                 $.bootstrapGrowl("Error,categoria no se ha guardado", {type: 'danger',delay: 120000});
            };

        });



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


    
    $scope.listaCategorias = function()
    {
        return ServiceCategoria.listaCategorias;
    }



    
    //Funcion para eliminar categoria
    $scope.eliminarCategoria = function(elemento,idCategoria)
    {
        FactoryCrearCategoria.eliminar({id:idCategoria}).then(function(d)
        {
            if(d.data.msg == true){

                var index = ServiceCategoria.listaCategorias.indexOf(elemento);
                ServiceCategoria.listaCategorias.splice(index,1);

                $.bootstrapGrowl("Categoria borrada exitosamente!!!", {type: 'success',delay: 120000});
            }else{
                $.bootstrapGrowl("Error,categoria no se ha borrado", {type: 'danger',delay: 120000});
            }
        });
    }


});
