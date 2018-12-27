SabuesoAPP.controller('ControlRoomController', function($scope, FactoryTransferencias){
    $scope.init = function(){
        $scope.loading = true;

        FactoryTransferencias.reporteTerminadas().then(function(res){
            
            $scope.loading = false;

            if (res.status == 200){

                let source = {
                    datatype: "json",
                    datafields: [
                        { name: 'Transferencia', type: 'string' },
                        { name: 'FechaHora', type: 'Date' },
                        { name: 'Vehiculo', type: 'string' },
                        { name: 'Conductor', type: 'string' },
                        { name: 'Viaje', type: 'string' },
                        { name: 'VentanaAtencion', type: 'Date' },
                        { name: 'VentanaRetorno', type: 'Date' },
                        { name: 'Estado', type: 'string' }
                    ],
                    id: 'id',
                    localdata: res.data.info
                }

                var addfilter = function () {
                    var filtergroup = new $.jqx.filter();
                    var filter_or_operator = 1;
                    var filtervalue = 'Beate';
                    var filtercondition = 'contains';
                    var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                    filtervalue = 'Andrew';
                    filtercondition = 'starts_with';
                    var filter2 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
      
                    filtergroup.addfilter(filter_or_operator, filter1);
                    filtergroup.addfilter(filter_or_operator, filter2);
                    // add the filters.
                    $("#jqxgrid").jqxGrid('addfilter', 'firstname', filtergroup);
                    // apply the filters.
                    $("#jqxgrid").jqxGrid('applyfilters');
                };

                let dataAdapter = new $.jqx.dataAdapter(source);

                let columns = [
                    { text: 'Transferencia', datafield: 'Transferencia' },
                    { text: 'Fecha Tranferencia', datafield: 'FechaHora'},
                    { text: 'Cabezal', datafield: 'Vehiculo'},
                    { text: 'Conductor', datafield: 'Conductor'},
                    { text: 'Viaje', datafield: 'Viaje'},
                    { text: 'Ventana Atencion', datafield: 'VentanaAtencion'},
                    { text: 'Ventana Retorno', datafield: 'VentanaRetorno'},
                    { text: 'Estado', datafield: 'Estado' }
                ];

                $scope.gridSettings = {
                    theme:'sabueso',
                    altrows: true,
                    width: '100%',
                    source: dataAdapter,
                    pageable: false,

                    //pagesize: 20,
                    filterable: true,
                    ready: function(){
                        $scope.gridSettings.apply('selectrow', 1);
                        //addfilter();
                    },
                    sortable: true,
                    columnsresize: true,
                    columnsautoresize: true,
                    columns: columns
                };

                $("#jqxgrid").on("pagechanged", function (event) {
                    $("#eventslog").css('display', 'block');
                    if ($("#events").find('.logged').length >= 5) {
                        $("#events").jqxPanel('clearcontent');
                    }
                    var args = event.args;
                    var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
                    $('#events').jqxPanel('prepend', '<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
                    // get page information.
                    var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                    $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
                });

                $("#jqxgrid").on("pagesizechanged", function (event) {
                    $("#eventslog").css('display', 'block');
                    $("#events").jqxPanel('clearcontent');
                    var args = event.args;
                    var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
                    $('#events').jqxPanel('prepend', '<div style="margin-top: 5px;">' + eventData + '</div>');
                    // get page information.
                    var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                    $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
                });

                // now create the widget.
                $scope.createWidget = true;

                $scope.excelExport=function () {
                    $("#jqxgrid").jqxGrid('exportdata', 'xls', 'Reporte_Motorista',true, null, true,'http://exportdata.stgands.com/dataexport.php');
                };
                $scope.htmlExport=function () {
                    $("#jqxgrid").jqxGrid('exportdata', 'html', 'Reporte_Motorista',true, null, true,'http://exportdata.stgands.com/dataexport.php');
                };
                $scope.pdfExport=function () {
                    $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'Reporte_Motorista',true, null, true,'http://exportdata.stgands.com/dataexport.php');
                };
            } else {
                $.bootstrapGrowl("No se pudo cargar el Reporte", {type: 'danger',delay: 120000});
            }
        });
    
    };
});