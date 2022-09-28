let picker, swiper;

(() => {
	$('.lazy').lazy();

	if( $('#map').length ){
		initMap();
	}

	if($('.datepicker').length){
		$('.datepicker').datepicker({
			i18n:{
				cancel: "Отмена",
				clear: "Очистить",
				done: "OK",
				months: [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь",
				],
				monthsShort: [
					"Янв",
					"Фев",
					"Мрт",
					"Апр",
					"Май",
					"Июн",
					"Июл",
					"Авг",
					"Снб",
					"Окт",
					"Ноя",
					"Дек",
				],
				weekdays: [
					'Понедельник',
					'Вторник',
					'Среда',
					'Четверг',
					'Пятница',
					'Суббота',
					'Воскресенье'
				],
				weekdaysShort:[
					'Пн',
					'Вт',
					'Ср',
					'Чт',
					'Пт',
					'Сб',
					'Вс'
				],
				weekdaysAbbrev: ['пн','вт','ср','чт','пт','сб','вс']
			}
		});
	}

	$('body').on('click', '#reserve-bttn', reserveTable);

	swiper = new Swiper( document.querySelector('#gallery'), {
		spaceBetween: 0,
		loop: true,
		speed: 600,
		breakpoints: {
			800: {
				slidesPerView: 2
			},
			480: {
				slidesPerView: 1
			}
		},
		autoplay: {
			delay: 5000
		},
		pagination: {
			type: 'bullets',
			el: '.swiper-pagination',
			clickable: true
		}
	} )

	swiper.on('slideChange', () => {
		$('.lazy').lazy();
	})
	
})();

function reserveTable(e){

	e.preventDefault();
	$.ajax({
		data: $('#reserve').serialize(),
		url: '/classes/sender.php',
		dataType: 'json',
		type: 'POST',
		success: response => {
			if(response.success){
				document.querySelector('#reserve').reset();
			}
			M.toast({html: response.message});
		},
		error: err => {
			console.error(err);
		}
	})
}

//Функция подключения
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Инициализация карты
function initMap(){

    loadScript( "https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js", () => {

        let coords = [39.87889,44.76842];
        let token = "pk.eyJ1IjoiZ2VuZXN5cyIsImEiOiJjbDhlZGpnMXUxa2VoM3BuMzBocmljZmdiIn0.ips7qa_gfSr299RO_C27bQ";

        mapboxgl.accessToken = token;
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/genesys/cl8edvjmf000e14nvk9ibnksl',
            center: coords,
            zoom: 16.25
        });

        const el = document.createElement( 'a' );
		el.href = "https://yandex.ru/maps/10988/belorechensk/?ll=39.881244%2C44.768600&mode=routes&rtext=~44.768296%2C39.878650&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyMTUyMzY0MzE0EnLQoNC%2B0YHRgdC40Y8sINCa0YDQsNGB0L3QvtC00LDRgNGB0LrQuNC5INC60YDQsNC5LCDQkdC10LvQvtGA0LXRh9C10L3RgdC6LCDQn9C10YDQstC%2B0LzQsNC50YHQutCw0Y8g0YPQu9C40YbQsCwgNDEiCg28gx9CFb0SM0I%3D&z=14.76";
		el.target = "_blank";
		el.rel = "nofollow";
        el.className = 'marker';

        let marker = new mapboxgl.Marker( el )
            .setLngLat(coords)
            .addTo(map);

        map.scrollZoom.disable()
        map.addControl(new mapboxgl.NavigationControl());

        $('#map').find('canvas').css({
            opacity: 1
        });

    } )
}