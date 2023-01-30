const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
   }
   window.addEventListener('resize', documentHeight)
   documentHeight()

const swiper1 = new Swiper('.swiper-container-1', {
    loop: false,
    effect: 'fade',
    speed: 500,
    autoplay: {
        delay: 900,
        stopOnLastSlide: true
      },
});   
const swiper2 = new Swiper('.swiper-container-2', {
    loop: true,
    effect: 'fade',
    speed: 500,
    autoplay: {
        delay: 1200,
      },
});   
const filterGallery = new Swiper('.swiper-container-3', {
    slidesPerView: 1,
    centeredSlides: true,
    speed: 600,
    loop: true,
    loopedSlides: 4,
});
const thumbs = new Swiper('.swiper-container-4', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
});

filterGallery.controller.control = thumbs;
thumbs.controller.control = filterGallery;

var imgURL;

(function($) {
	$(document).ready(function(){

        // intro animation:
        $('.swiper-container-1').addClass('slideUP');

        // screen 2 button:
		$('#next_screen').on('click', function(e) {
            //button:
            $(this).toggleClass('shrink');
			$(this).fadeOut( 250, function() {
                $('#permit_camera').toggleClass('shrink').fadeIn(250);
            });
            //change text:
            $('#sc-02').removeClass('visible');
            setTimeout(function(){
                $('#sc-03').addClass('visible');
            }, 900);
		});	

        // open camera screen:
        $('#permit_camera').on('click', function(e) {
            swiper2.autoplay.stop();
            $('#s-02').removeClass('active');
            $('#step1').addClass('active');
        });	

        // move to filter gallery screen:
        $('#screenshot-button').on('click', function(e) {
            $('#step1').removeClass('active');
            $('#step2').addClass('active');
            setTimeout(function(){
                $('.timer-hide').toggleClass('hidden');
            }, 1000);
        });	 
        $('#back').on('click', function(e) {
            $('#step2').removeClass('active');
            $('#step1').addClass('active');
        });
        $('#share').on('click', function(e) {
            $('#share_nav').toggleClass('closed');
            $(this).find('.icon-close').toggleClass('vis');
            $(this).find('.icon-share').toggleClass('vis');
        });

        // open info ticket:
        $('#info_toggle').on('click', function(e) {
            $('#filter_gallery .swiper-slide-active').find('.filter_info').addClass('open_card');
            $('#filtercontrol').fadeOut(200);
            $("#info_toggle").fadeOut(200);
            $('#share,#share_nav,#back').css({
                'opacity': '0',
                'visibility': 'hidden'
            });
        });	
        // close info ticket:
        $('.close_info').on('click', function(e) {
            $(this).parents('.filter_info').removeClass('open_card');
            setTimeout(function(){
                $('#filtercontrol').fadeIn(500);
                $("#info_toggle").fadeIn(500);
                $('#share,#share_nav,#back').css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
            }, 700);
        });	
        
    });

    // change to first screen after intro:
    swiper1.on('reachEnd', function(){
        setTimeout(function(){
            $('#s-01').removeClass('active');
            $('#s-02').addClass('active');
        }, 1200);
        setTimeout(function(){
            $('#sc-02').addClass('visible');
            $('#next_screen').addClass('scale');
        }, 1600);
    });
    // change to first screen on intro click:
    $('#intro-swiper').on('click', function(e) {
        swiper1.autoplay.stop();
        $('#s-01').removeClass('active');
        $('#s-02').addClass('active');
        setTimeout(function(){
            $('#sc-02').addClass('visible');
            $('#next_screen').addClass('scale');
        }, 600);
    });	 

    // slide between filter images:
    thumbs.on("slideChange", function() {
        if(this.realIndex != 0){      
            $("#info_toggle,#share").fadeOut(150);
            $('#filtercontrol,#back,#share_nav').css('opacity', '0');
            setTimeout(function(){
                $('#filtercontrol,#back,#share_nav').animate({ opacity: 1, }, 500);
                $("#info_toggle,#share").fadeIn(500);
            }, 900);
        } else {
            $("#info_toggle,#share").fadeOut(150);
            $('#share_nav').css('opacity', '0');
        }
    });
    filterGallery.on("slideChangeTransitionEnd", function() {
        updateShare();
    });

    function updateShare(){
        var imgURL = document.querySelector('#filter_gallery .swiper-slide-active img').src;
        $("#facebook_share").attr("href", "https://www.facebook.com/sharer/sharer.php?u="+imgURL);
        $("#download_img").attr("href", imgURL);
        console.log(imgURL);
    }

})(jQuery);	    

function openWhatsApp() {  
    var imgURL = document.querySelector('#filter_gallery .swiper-slide-active img').src;
    window.open('whatsapp://send?text='+imgURL);  
}

// OLD Video code:
function openCam(){
    let All_mediaDevices=navigator.mediaDevices
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
       console.log("getUserMedia() not supported.");
       return;
    }
    All_mediaDevices.getUserMedia({
       audio: false,
       video: true
    })
    .then(function(vidStream) {
       var video = document.getElementById('videoCam');
       if ("srcObject" in video) {
          video.srcObject = vidStream;
       } else {
          video.src = window.URL.createObjectURL(vidStream);
       }
       video.onloadedmetadata = function(e) {
          video.play();
       };
    })
    .catch(function(e) {
       console.log(e.name + ": " + e.message);
    });
}
function stopStreamedVideo() {
    var video = document.getElementById('videoCam');
    const stream = video.srcObject;
    const tracks = stream.getTracks();
  
    tracks.forEach((track) => {
      track.stop();
    });
  
    video.srcObject = null;
}