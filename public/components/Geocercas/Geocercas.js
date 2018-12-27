/**
 * Created by GMG on 08/07/2015.
 */

function Geocercas(map,source,layer) {


    var select = new ol.interaction.Select();
    var erase = new ol.interaction.Select();
    var wkt = new ol.format.WKT();

    var lineDraw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });

    var modify = new ol.interaction.Modify({
        features: select.getFeatures(),
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });

    $('#drawLine').click(function() {
        clearCustomInteractions();
        $(this).addClass('active');
        map.addInteraction(lineDraw);

        lineDraw.on('drawend', function(e) {
            generateWkt();

            //$("#modal-container-443118").modal({backdrop: "static"});
            //ServicioMapa.vista = "components/Geoc/VistaCrear.html";
            angular.element(document.getElementById('divMapa')).scope().saveGeocerca();
            //abrirModal('modal-contenedor',"Crear Referencia",1,1);
            clearCustomInteractions();
            $(this).addClass('active');

        });
    });

    $('#editLine').click(function() {
        clearCustomInteractions();
        $(this).addClass('active');
        map.addInteraction(select);
        map.addInteraction(modify);

        editado = false;
        var unionFeatures = [];
        select.getFeatures().on('add', function(e) {
            var feature = e.element;
            console.log(typeof(feature));
           // alert(e.element);
            feature.on('change', function(e) {
            editado = true;
            });
        });

        select.getFeatures().on('remove', function(e) {
            var feature1 = e.element;
            if (editado)
            {
                var fclone = feature1.clone();
                var format = new ol.format.WKT();
                featureWkt = format.writeFeature(fclone);
                var feature = format.readFeature(featureWkt);
                var id = feature1['Id'];
                var Nombre = feature1['Nombre'];
                var color = feature1['color'];
                var desc= feature1['Descripcion'];
                var estado = feature1['Estado']==1?"VISIBLE":"NO VISIBLE";

                feature.getGeometry().transform( 'EPSG:3857','EPSG:4326');
                var newFEature =format.writeFeature(feature);
                modifiedWkt = (newFEature.replace(/,/g, ', ')).replace(/POLYGON/g, '').slice(1, -1);
                info= {
                    posiciones:modifiedWkt,
                    id:id,
                    nombre:Nombre,
                }

                editado=false;
                angular.element(document.getElementById('divMapa')).scope().ActualizarGeocerca();
                $("#puntosupdt").val(modifiedWkt);
                $("#nombreupdt").val(Nombre);
                $("#idudpt").val(id);
                $("#colorupdt").val(color);
                $("#descripcionupdt").val(desc);
                $("#estadoupdt").val(estado);

                $("#puntosupdt").trigger('input');
                $("#nombreupdt").trigger('input');
                $("#idudpt").trigger('input');
                $("#colorupdt").trigger('input');
                $("#descripcionupdt").trigger('input');
                $("#estadoupdt").trigger('input');
                map.removeInteraction(select);
                map.removeInteraction(modify);
                clearCustomInteractions();
                $(this).addClass('active');
                //$("#modal-container-update").modal({backdrop: "static"});

            }
        });

        return false;
    });

    $('#eraseLine').click(function() {


        clearCustomInteractions();
        //alert("me voy eliminando");
        $(this).addClass('active');
        map.addInteraction(erase);

        erase.getFeatures().on('change:length', function(e) {
            if(e.target.getArray().length !== 0) {
                arr = e.target.getArray();
                layer.getSource().clear(arr);
                generateWkt();

                var GeoId = $(this)[0].a[0].Id;
                angular.element(document.getElementById('divMapa')).scope().eliminarGeocerca(GeoId);

            }
        });

        return false;
    });

    $('#pan').click(function() {
        clearCustomInteractions();
        $(this).addClass('active');
        return false;
    });

    map.addLayer(layer);

    function clearCustomInteractions() {
        $('#bar').find('p').removeClass('active');
        map.removeInteraction(lineDraw);
    }

    function generateWkt() {
        var featureWkt, modifiedWkt;
        var unionFeatures = [];

        layer.getSource().forEachFeature(function(f) {
            var featureClone = f.clone();
            featureWkt = wkt.writeFeature(featureClone);
            var format = new ol.format.WKT();
            var feature = format.readFeature(featureWkt);
            feature.getGeometry().transform( 'EPSG:3857','EPSG:4326');
            var newFEature =format.writeFeature(feature);
            if(newFEature.match(/POLYGON/g)) {
                modifiedWkt = (newFEature.replace(/POLYGON/g, '')).slice(1, -1);
            } else {
                modifiedWkt = (newFEature.replace(/,/g, ', ')).replace(/POLYGON/g, '');
            }
            unionFeatures.push(modifiedWkt);

            $("#puntos").val(unionFeatures);
            $("#puntos").trigger('input');
            unionFeatures = [];


        });

    }


};