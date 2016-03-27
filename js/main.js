$(function() {
   var items = [];
   var videos = JSON.parse(__videos);
   $.each(videos, function(key, val) {
      items.push('<div class="slide-item">' +
                     '<video autoplay muted controls="false" preload="auto" id="video1">' +
                         '<source src="./files/videos/' + val + '" type="video/mp4">' +
                     '</video>' +
                  '</div>');
  });

   var banners = JSON.parse(__banners);
   $.each(banners, function(key, val) {
      items.push('<div class="slide-item">' +
                     '<img src="./files/banners/' + val + '" />' +
                  '</div>');
  });

  $("#start").after($(items.join("")));

   var MODES = ['horizontal', 'fade'];
   var EASINGS = ['linear','swing','easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInExpo','easeOutExpo','easeInOutExpo','easeInSine','easeOutSine','easeInOutSine','easeInCirc','easeOutCirc','easeInOutCirc','easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce'];
   var rand = 0;
   rand = Math.floor(Math.random() * MODES.length);
   var mode = MODES[rand];
   rand = Math.floor(Math.random() * EASINGS.length);
   var easing = EASINGS[rand];

   var slider = $('#slider').bxSlider({
      auto: true,
      controls: false,
      speed: 500,
      pause: 3500,
      mode: mode,
      useCSS: false,
      easing: easing,
      pager: false,
      infiniteLoop: true,
      adaptiveHeight: true,
      wrapperClass: 'bx-wrapper',
      onSlideAfter: function(curSlide) {
         if (curSlide[0].id == "end") {
            location.reload(true);
         }
         var video = curSlide.children('video') && curSlide.children('video')[0];
         if (video) {
           slider.stopAuto();
           video.play();
         }
      }
  });

  $('video').each(function() {
     this.onended = function() {
        slider.startAuto();
     };
     // remove controls
     this.removeAttribute("controls");
  });
});