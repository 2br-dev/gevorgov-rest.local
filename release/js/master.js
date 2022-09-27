(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var picker;

(function () {
  $('.lazy').lazy();

  if ($('#map').length) {
    initMap();
  }

  if ($('.datepicker').length) {
    $('.datepicker').datepicker({
      i18n: {
        cancel: "Отмена",
        clear: "Очистить",
        done: "OK",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мрт", "Апр", "Май", "Июн", "Июл", "Авг", "Снб", "Окт", "Ноя", "Дек"],
        weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        weekdaysAbbrev: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
      }
    });
  }

  $('body').on('click', '#reserve-bttn', reserveTable);
})();

function reserveTable(e) {
  e.preventDefault();
  $.ajax({
    data: $('#reserve').serialize(),
    url: '/classes/sender.php',
    dataType: 'json',
    type: 'POST',
    success: function success(response) {
      if (response.success) {
        document.querySelector('#reserve').reset();
      }

      M.toast({
        html: response.message
      });
    },
    error: function error(err) {
      console.error(err);
    }
  });
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function initMap() {
  loadScript("https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js", function () {
    var coords = [39.87889, 44.76842];
    var token = "pk.eyJ1IjoiZ2VuZXN5cyIsImEiOiJjbDhlZGpnMXUxa2VoM3BuMzBocmljZmdiIn0.ips7qa_gfSr299RO_C27bQ";
    mapboxgl.accessToken = token;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/genesys/cl8edvjmf000e14nvk9ibnksl',
      center: coords,
      zoom: 16.25
    });
    var el = document.createElement('a');
    el.href = "https://yandex.ru/maps/10988/belorechensk/?ll=39.878973%2C44.768392&mode=routes&rtext=~44.768420%2C39.878890&rtt=auto&ruri=~&z=17.62";
    el.target = "_blank";
    el.rel = "nofollow";
    el.className = 'marker';
    var marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());
    $('#map').find('canvas').css({
      opacity: 1
    });
  });
}

},{}]},{},[1]);
