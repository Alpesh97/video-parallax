// browser specific js
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = "" + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;


// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
}
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
}
// In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
}
var OSName = "UnknownOS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
jQuery("body,html")
.addClass(browserName.toLowerCase())
.addClass(OSName.toLowerCase());

if (navigator.userAgent.match(/iP(hone|od|ad)/i)) {
    jQuery("body,html").addClass("browser-ios");
}

function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
}

var flag = false;
function casestudy_slider() {
    if (!flag) {
        jQuery('.client-logo-slider').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            arrows: false,
            dots: false,
            slidesToShow: 4,
            autoplay: true,
            infinite: true,
            slidesToScroll: 1,
            speed: 3000,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                }
            }
            ]
        }).on('afterChange', function(event){
          jQuery('.slick-slide').removeClass('last-child');
          jQuery('.slick-active').last().addClass('last-child');
        });
        flag  = true;
    }
}

function sticky_header() {
    if (jQuery(window).scrollTop() > 0) {
        jQuery(".site-header").addClass("sticky");
    } else {
        jQuery(".site-header").removeClass("sticky");
    }
}

// clock
var HOURHAND = document.getElementsByClassName("hour");
var MINUTEHAND = document.getElementsByClassName("minute");
var clock = document.getElementsByClassName('clock');

function startClock() {
    for (var i = 0; i < clock.length; i++) {
       var d = new Date();
       var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
       var offset = clock[i].getAttribute('timezoneoffset');
       var currentTime = new Date(utc + (3600000*offset));
       var currentHours = currentTime.getHours ( );
       var currentMinutes = currentTime.getMinutes ( );
       var currentSeconds = currentTime.getSeconds();
       currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
       currentSeconds = ( currentSeconds < 60 ? "0" : "" ) + currentSeconds;
       var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
       currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
       currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    
       var minPosition = (6 * currentMinutes) + (currentSeconds * (360 / 60) / 60);
       var hrPosition = ((360 / 12) * currentHours) + (currentMinutes * (360 / 60) / 12);
       MINUTEHAND[i].style.transform = "rotate(" + minPosition + "deg)";
       HOURHAND[i].style.transform = "rotate(" + hrPosition + "deg)";
   }
}

setInterval(startClock, 10);

// scroll spy
function scrollspy() {
    var sTop = jQuery(window).scrollTop();
    jQuery('.scrollspy-block').each(function() {
        var id = jQuery(this).attr('id');
        offset = jQuery(this).offset().top - jQuery('header').innerHeight() - 1;
        height = jQuery(this).height();
        if (sTop >= offset && sTop < offset + height) {
            jQuery(".scroll-to-section").find("a[href='#"+id+"']").closest('.scroll-to-section').addClass('active').siblings().removeClass('active');
        }

    });
}

// for check the section in view port or not;
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function parallaxVideo() {
    jQuery('.parallax-video').each(function(e){
      var element = jQuery(this);

        if (element.isInViewport()) {
            element.addClass('active-section');
        }
        else{ 
              element.removeClass('active-section');   
        }
  });
}

function parallaxImg() {
    jQuery('.parallax-img').each(function(){
        var imageElement = jQuery(this);

        var sTop = jQuery(window).scrollTop();
        var offset = imageElement.offset().top;
        var height = imageElement.innerHeight();
        var value = 0;

        if (imageElement.isInViewport()) {
             value = Math.round((sTop - offset) * 0.8);
        }
        else{ 
              value = 0;
        }
        
        imageElement.css({
          backgroundPosition: '50%' + value + 'px'
        });

    });
}


/* Document Ready */
jQuery(document).ready(function() {
	
	sticky_header();
	casestudy_slider();
    scrollspy();
    parallaxImg();

    // setTimeout(function(){
        parallaxVideo();
    // },200);

    //for mobile menu
    jQuery('.site-header .hamburger-icon').click(function(){
        jQuery('body').toggleClass('open-menu');
    });

	jQuery("a[href='#']").click(function(e) {
		e.preventDefault();
	});

    if (jQuery('.client-logo-slider').length) {
        setTimeout(function(){
            jQuery('.client-logo-slider .slick-slide').removeClass('last-child');
            jQuery('.client-logo-slider .slick-active').last().addClass('last-child');
        },100);
    }

});


/* Window Resize */
jQuery(window).resize(function() {
	sticky_header();
	casestudy_slider();
    if (jQuery(window).innerWidth() > 991) {
        jQuery('body').removeClass('open-menu');
    }
});

/* Window Load */
jQuery(window).on("load",function() {
    //scroll-to-section
    jQuery('.scroll-to-section a').click(function(){
        jQuery('body').removeClass('open-menu');
        jQuery(this).parent(".scroll-to-section").addClass('active').siblings().removeClass('active');
        var _this_id = jQuery(this).attr('href');
        var _this_content_offset = jQuery(_this_id).offset().top - jQuery('.site-header').innerHeight() + 1;
        jQuery('html,body').animate({
            scrollTop:_this_content_offset
        },700, function(){
            if (jQuery('.site-header').hasClass('sticky')) {

                var new_offset = jQuery(_this_id).offset().top - jQuery('.site-header.sticky').innerHeight() + 1;

                jQuery('html,body').animate({
                    scrollTop: new_offset
                },200);
            }
        });
    });
});

/* Window Load */
jQuery(window).on("scroll",function() {
	
	sticky_header();
    scrollspy();
    parallaxVideo();
    parallaxImg();

});

