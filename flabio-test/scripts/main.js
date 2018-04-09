'use strict';

var bLazy = new Blazy({
  // Options
});

var clickEffect = {
  init: function init() {
    $(document).on('click', function (e) {
      $('<div class="cursor">').css({
        top: e.clientY,
        left: e.clientX
      }).appendTo($(document.body)).on('animationend webkitAnimationEnd', function () {
        $(this).remove();
      });
    });
  }
};
clickEffect.init();

$(window).on("scroll", function () {
  $(window).scrollTop() >= $(window).height() ? $('.main__wrap').addClass('scrolled') : $('.main__wrap').removeClass('scrolled');
});

$(document).ready(function () {

  $(window).on("load", function () {
    $('.preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

  var typed = new Typed('.typed_js', {
    strings: ["магазины", "логотипы", "фирменные стили", "корпоративные сайты", "посадочные страницы", "сервисы", "построение продаж"],
    stringsElement: null,
    typeSpeed: 50,
    startDelay: 200,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
    showCursor: false,
    attr: null
  });

  // owl
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    items: 1,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
  });
  // owl

  // malihu
  $(".mCustomScrollbar").mCustomScrollbar({
    theme: "dark"
  });
  // malihu

  // iframe
  // empty link
  $("a[href^='#']").on("click", function (e) {
    e.preventDefault();
    //return false;
  });

  // tab New
  $(".add").on("click", function (e) {
    if ($(".tabs li").size() < 4) {
      $(".tabs li.active").removeClass("active");
      $(".tabs").append('<li class="active"></li>');
      $(".page iframe").attr("src", "");
    }
  });

  // tab Click.active
  $(".tabs li").on("click", function (e) {
    $(".tabs li.active").removeClass("active");
    $(this).addClass("active");
    $(".page iframe").attr("src", $(this).find("a").attr("href"));
    e.preventDefault();
  });

  // tab Close
  $(".tabs li a.close").on("click", function (e) {
    $(this).closest("li").remove();
    if ($(".tabs li").size() == 0) {
      $(".tabs").append('<li></li>');
    }
    $(".tabs li:last-child").addClass("active");
    e.preventDefault();
  });
  // iframe end

  $('.main__scroll').click(function () {
    $('html, body').animate({ scrollTop: $("#content").offset().top }, 700);
    return false;
  });

  // Example 1: From an element in DOM
  // $('.open-popup-link').magnificPopup({
  //   type:'inline',
  //   midClick: true
  // });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: false,
    callbacks: {
      open: function open() {
        $('.scrolled').css({ 'overflow-y': 'scroll' });
      },
      close: function close() {
        $('.scrolled').css({ 'overflow-y': 'visible' });
      }
    },
    removalDelay: 800,
    mainClass: 'mfp-move-horizontal'
  });

  $('.open-popup-link1').magnificPopup({
    type: 'iframe'
  });

  $('.main__head ul').clone().appendTo('.mmenu-nav');
  var $menu = $('.mmenu-nav').mmenu({
    navbar: {
      title: '<img src=\'images/logo.png\' alt=\'\' />'
    },
    navbars: [{
      "position": "bottom",
      "content": ["<a href='mailto:hello@flabio.kg'><i class='fa fa-envelope-o'></i>hello@flabio.kg</a>"]
    }],
    extensions: ['fx-menu-slide', 'fx-listitems-slide', 'border-full', 'pagedim-black'],
    offCanvas: {
      'position': 'left'
    },
    counters: true
  });
  var $icon = $('.js-navtrigger');
  var API = $menu.data('mmenu');
  $icon.on('click', function () {
    API.open();
  });
  API.bind('open:start', function ($panel) {
    $('.js-navtrigger').toggleClass('-active');
  });
  API.bind('close:start', function ($panel) {
    $('.js-navtrigger').toggleClass('-active');
  });
  if (Modernizr.mq('(max-width: 992px)')) {
    $('a.-pagescroll[href*="#"]:not([href="#"])').click(function () {
      API.close();
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 115
          }, 1000);
          return false;
        }
      }
    });
  } else {
    $('a.-pagescroll[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 73
          }, 1000);
          return false;
        }
      }
    });
  }
});

$(document).ready(function () {

  // input эффекты начало
  $('.input').focus(function () {
    $(this).parent().addClass('focus');
  });
  // input эффекты конец

  //E-mail Ajax Send начало
  $('form').submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: 'POST',
      url: 'mail.php', //Change
      data: th.serialize()
    }).done(function () {
      $.magnificPopup.open({
        items: {
          src: '#popup_pric'
        },
        type: 'inline',
        midClick: true
      });
      setTimeout(function () {
        $.magnificPopup.close();
      }, 3000);
    });
    return false;
  });
  //E-mail Ajax Send конец

  // choose file начало
  'use strict';

  ;(function (document, window, index) {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
          labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

        if (fileName) label.querySelector('span').innerHTML = fileName;else label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener('focus', function () {
        input.classList.add('has-focus');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
      });
    });
  })(document, window, 0);
  // choose file конец

});