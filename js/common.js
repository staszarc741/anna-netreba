
// Smooth Scrolling
  $('a[href="#problems"], a[href="#price"]').on('click', function(event) {
      event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
        });
    });

  // подключение slick слайдера для дипломов
	$('.diplomas_list').slick({
	  centerMode: true,
	  centerPadding: '0px',
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: true,
	        dots: true,
	        centerMode: true,
	        slidesToShow: 1
	      }
	    }
	  ]
	});
  // подключение magnificPopup для дипломов
	$('.diplomas_item .link-img').magnificPopup({
    type: 'image',
    zoom: {
      enabled: true,
      duration: 300
    },
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    }
  });
  // подключение magnificPopup для изображений блока images
  $('.images__list .link-img').magnificPopup({
    type: 'image',
    zoom: {
      enabled: true,
      duration: 300
    },
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    }
  });
  
   // подключение slick слайдера для отзывов с кастомной навигацией
  $(".review__carousel").slick({

      autoplay: true,
      dots: true,
      customPaging : function(slider, i) {
          var thumb = $(slider.$slides[i]).data('thumb');
          return '<a><img src="'+thumb+'"></a>';
          consoleLog(thumb);
      },

      responsive: [{ 
          breakpoint: 1199,
          settings: {
              dots: false,
          } 
      }]
  });


// сохраняем поля querystring utm_* в куках и потом передаём в формы в поле traffic_source

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getURLUTMParameters() {
  var pageURL = window.location.search.substring(1);
  var URLVariables = pageURL.split('&');
  var res = {};
  for (var i = 0; i < URLVariables.length; i++) {
    var parameterName = URLVariables[i].split('=');
    if (parameterName[0].substr(0, 4) == 'utm_') {
      res[parameterName[0]] = parameterName[1];
    }
  }
  return res;
}

function getCookie(cookieName){
  var name = cookieName + "=";
  var cookieArray = document.cookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].replace(/^\s+|\s+$/g, '');
    if (cookie.indexOf(name)==0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
} 

function setCookie(cookie, value){
  var expires = new Date();
  expires.setTime(expires.getTime() + 2592000000); //1000*60*60*24*30 (30 days)
  document.cookie = cookie + "=" + value + "; expires=" + expires.toGMTString() + "; path=/";
}

var trafficSource = getCookie('traffic_source');
if (!trafficSource) {
  var utmParams = getURLUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    var trafficSource = JSON.stringify(utmParams);
    setCookie('traffic_source', trafficSource);
  }
}
console.log(trafficSource);

$(document).ready(function() {
  $('input[name=traffic_source]').val(trafficSource);
  $('input[data-field=traffic_source]').val(trafficSource);

  $('form').submit(function(){
    $('input[name=roistat]').val(getCookie('roistat_visit'));
    $('input[data-field=roistat]').val(getCookie('roistat_visit'));
  })

  $('input[data-field=referer]').val(document.location.href);
});
