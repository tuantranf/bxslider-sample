$(function() {
  // load config
  var config = JSON.parse(__config);

  var items = [];
  var videos = JSON.parse(__videos);
  _.each(_.sampleSize(videos, config.video_num), function(val) {
    items.push('<div class="slide-item video">\
                  <div class="row">\
                    <video autoplay muted controls="false" preload="auto" id="video1">\
                       <source src="./files/videos/' + val + '" type="video/mp4">\
                    </video>\
                  </div>\
                </div>');
  });

  var banners = JSON.parse(__banners);
  _.each(_.sampleSize(banners, config.banner_num), function(val) {
      items.push('<div class="slide-item banner">\
                    <div class="row">\
                      <img src="./files/banners/' + val + '" />\
                    </div>\
                  </div>');
  });


  var mvp = JSON.parse(__mvp);
  var members = JSON.parse(__members);
  _.each(mvp.members, function(val, key) {
      items.push('<div class="slide-item member">\
                    <div class="row">\
                      <div class="col-md-2">\
                        <img class="member-profile thumbnail" src="./files/members/profiles/' + key + '.png" />\
                      </div>\
                      <div class="col-md-10">\
                        <h1>' + members[key].name + '</h1>\
                      </div>\
                    </div>\
                    <div class="row">\
                      <div class="col-md-10">\
                        <img class="member-banner" src="./files/members/' + mvp.latest + '/' + val.banner + '" />\
                      </div>\
                      <div class="col-md-2">\
                        <h2>CTR: ' + val.CTR + '% </h2>\
                        <h2>CVR: ' + val.CVR + '% </h2>\
                      </div>\
                    </div>\
                  </div>');
  });

  $("#start").after($(items.join("")));

  var MODE = 'horizontal';
  var EASINGS = ['linear','swing','easeInCubic','easeInQuart','easeInQuint','easeInSine','easeInCirc','easeInElastic','easeInBack','easeInBounce'];
  var OPTS = {
    video: {
      speed: 1500,
      pause: config.video_duration_sec * 1000
    },
    banner: {
      speed: 500,
      pause: config.banner_duration_sec * 1000
    },
    member: {
      speed: 500,
      pause: config.member_duration_sec * 1000
    }
  };

  var opt_name = 'video'; // only work with it
  var slider = $('#slider').bxSlider();
  updateSlider(0, opt_name);
  var count = slider.getSlideCount();

  function onSlideAfterHandler(curSlide) {
    // reload page when slide end
    if (slider.getCurrentSlide() == (count - 1)) {
      setTimeout(function() {
        console.log("end - reload page");
        location.reload(true);
      }, OPTS[opt_name].pause);
    }

    // video
    if (curSlide.hasClass("video")) { // never come here
      if (opt_name != "video") {
        console.log("change to video setting");
        opt_name = "video";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }

      // can not play video in onSlideAfterHandler
      slider.stopAuto();
      curSlide.find('video')[0].play();
    }

    // banner
    if (curSlide.hasClass("banner")) {
      if (opt_name != "banner") {
        console.log("change to banner setting");
        opt_name = "banner";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }
    }

    // member
    if (curSlide.hasClass("member")) {
      if (opt_name != "member") {
        console.log("change to member setting");
        opt_name = "member";
        updateSlider(slider.getCurrentSlide(), opt_name);
        return;
      }
    }
  }

  function updateSlider(startSlide, opt_name) {
    startSlide = startSlide || 0;

    var mode = MODE;
    var rand = Math.floor(Math.random() * EASINGS.length);
    var easing = EASINGS[rand];
    var opts = OPTS[opt_name];

    slider.reloadSlider({
      auto: true,
      controls: false,
    //  autoControls: true,
      speed: opts.speed,
      pause: opts.pause,
      mode: mode,
      useCSS: false,
      easing: easing,
      pager: false,
      infiniteLoop: false,
      adaptiveHeight: true,
      startSlide: startSlide,
      onSlideAfter: onSlideAfterHandler
    });
  }

  $('video').each(function() {
     this.onended = function() {
        slider.startAuto();
     };
     // remove controls
     this.removeAttribute("controls");
  });
});