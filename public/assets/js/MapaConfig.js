var pointDraw;
var map;



function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

	function cargarMapa(){
		console.log("se cargara mapa para geocercas");
		///$("#mapa123").html("123");


		arr = ConfigurarMapa();
		Geocercas(map,arr[0],arr[1]);

		$.ajax({
			url: "/geocercas/true",
			headers:globalHeader,
			type: "GET",
			success: function(data, textStatus, request){
				var vect = dibujoGeocercas(data.info,map);
			}

		});

	}

	function dibujoGeocercas(json,map)
	{
		$.each(json,function(i,val){

				var valPos = JSON.parse(val.pos)

				hexColor = hexToRgb(valPos.properties.ColorGeocerca)
				rColor = hexColor.r;
				gColor = hexColor.g;
				bColor = hexColor.b;


				var stroke = new ol.style.Stroke({
					color: 'black'
				});
				var textStroke = new ol.style.Stroke({
					color: '#fff',
					width: 3
				});

				var style = new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'blue',
						width: 1

					}),
					fill: new ol.style.Fill({



						color: 'rgba('+rColor+', '+gColor+', '+bColor+', 0.5)'

					}),


					text: new ol.style.Text({
						text: valPos.Nombre,
						font: '12px Calibri,sans-serif',
						fill: new ol.style.Fill({
							color: '#ffffff',
							stroke:textStroke

						})

					})
				});

				var format = new ol.format.WKT();
				var feature = format.readFeature(
					'POLYGON('+val.puntos+')'
				);
				feature.Id=val.id;
				feature.Nombre= valPos.properties.Nombre;
				feature.color = valPos.properties.ColorGeocerca;
				feature.Descripcion = valPos.properties.Descripcion
				feature.Estado = val.Visible;

				feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
				var vector = new ol.layer.Vector({
					style: style,
					source: new ol.source.Vector({features:[feature]})
				});
				map.addLayer(vector);
			}
		)

	}


	/*$('#layers input[type=radio]').change(function () {
		var layer = $(this).val();
		map.getLayers().getArray().forEach(function (e) {
			var name = e.get('name');
			e.setVisible(name == layer);
		});
	});
*/
function ConfigurarMapa()
{
	var view = new ol.View({
		center: [-9799551.8821657, 1749399.9341765],
		zoom: 12,
		maxZoom: 16,
		minZoom: 2,

	});

	var source = new ol.source.Vector();

	var layer = new ol.layer.Vector({
		source: source
	});


	//:::::::::::::::::::::::::::::::::instancia de mapas::::::::::::::::::::::::::::::::::
	var baseLayer = new ol.layer.Tile({
		source: new ol.source.OSM(),
		name: 'baseLayer'
	});


	var bingmaps = new ol.layer.Tile({
		source: new ol.source.BingMaps({
			key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
			imagerySet: 'AerialWithLabels'
		}),
		visible: false,
		name: 'bingmaps',

	});

	var esri = new ol.layer.Tile({
		source: new ol.source.XYZ({
			attributions: [
				new ol.Attribution({
					html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
					'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
				})
			],
			url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
			'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
		}),
		visible: false,
		name: 'esri'
	});



	//:::::::::::
	map = new ol.Map({
		target: 'mapa123',
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine(),
			new ol.control.ZoomSlider(),
			new ol.control.FullScreen(),
			new ol.control.OverviewMap()

		]),
		renderer: 'canvas',
		layers: [baseLayer,esri,bingmaps],

		view: view

	});
	map.on("Zoom", function() {
		console.log('Zooming...');
	});

	retu =[source,layer]
	return retu
}


function vehiculos(map){


	var vectorSource = new ol.source.Vector({
		features: iconFeatures //add an array of features
	});

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 0.75,
			src: 'http://icons.iconarchive.com/icons/icons-land/transport/48/Car-icon.png'
		}))
	});

	var vectorLayer = new ol.layer.Vector({
		source: vectorSource,
		style: iconStyle
	});
	map.addLayer(vectorLayer);
}
