var $ = jQuery['noConflict']();
(function ($) {
    function callback() {
      var duration = $('#preloader'), _preloaderDuration = 800, _preloaderDelay = 500;
      duration['velocity']('fadeOut', {
        delay: _preloaderDelay,
        duration: _preloaderDuration,
        complete: function () {
          $('section.active')['velocity']('stop', true)['velocity']('transition.slideDownIn', {
            duration: 1200
          });
        }
      });
    }
    
    function contentScroll(container) {
      if (checkMobile) {
        container['addClass']('scroll-wrap');
      } else {
        container['perfectScrollbar']({
          suppressScrollX: true
        });
      }
    }
    
    /*  вигляд для дектопів і мобілок + preventDefault для a[href="#"] */
    function createTable() {
      contentScroll($('.section-wrap'));
      $('a[href="#"]')['on']('click', function (dataAndEvents) {
        dataAndEvents['preventDefault']();
      });
      /*  клонуються соціальні іконки для мобілок */
      var _0x4ae1xf = $('.social-list')['clone']();
      _0x4ae1xf['insertAfter']('#menu');
      $('.section-title').each(function(){
        var currentTitle = $(this).html(),
          firstLetter = currentTitle.substring(0,1);
        $(this).children('.letter').html(firstLetter);
      });
    }
    
    function bgvideo() {
      var emptyJ = $('.html5-video');
      var mobile_img = collection.data('img-mob');
      var desk_img = collection.data('img-desk');
      if (checkMobile) {
        collection['backstretch'](mobile_img);
      } else {
        collection['backstretch'](desk_img);
        emptyJ['addClass']('play');
      }
    }
    
    /*  показ менюшки  */
    function domReady() {
      var emptyJ = $('.menu-toggle-wrap');
      var $spy = $('#menu-wrap');
      var menuItem = $('#menu')['find']('li');
      emptyJ['on']('click', function (dataAndEvents) {
        dataAndEvents['preventDefault']();
        $src['toggleClass']('menu-in');
        if ($src['hasClass']('menu-in')) {
          $spy['velocity']('stop', true)['velocity']('fadeIn', {
            duration: 500
          });
          menuItem['velocity']('stop', true)['velocity']('transition.slideUpIn', {
            stagger: 100
          });
        } else {
          menuItem['velocity']('transition.slideUpOut', {
            stagger: 100
          });
          $spy['velocity']('stop', true)['velocity']('fadeOut', {
            duration: 500
          });
        }
      });
    }
    
    /*  показує секцію  */
    function uploadContentFiles() {
      var firstSection = $('section.active');
      var firstId = firstSection.attr('id');
      var stateObject = {section:firstId};
      history.replaceState(stateObject,'','');
      function changeSection(chosenSection,chosenMenu){
        var menuItem = $('#menu')['find']('li');
        var jqNodes = $('#menu-wrap');
        var doc = $('section.active');
        var emptyJ = $('#preloader');
        var domContentLoaded = $('#menu')['find']('.active');
        if (!chosenSection['hasClass']('active')) {
          $src['removeClass']('menu-in');
          menuItem['velocity']('transition.slideUpOut', {
            stagger: 80
          });
          jqNodes['velocity']('stop', true)['velocity']('fadeOut', {
            duration: 500
          });
          doc['velocity']('stop', true)['velocity']('transition.slideUpOut', {
            duration: 1200,
            complete: function () {
              emptyJ['velocity']('fadeIn', {
                duration: 800,
                complete: function () {
                  emptyJ['velocity']('fadeOut', {
                    duration: 800,
                    delay: 100,
                    complete: function () {
                      chosenSection['velocity']('transition.slideDownIn', {
                        duration: 1200
                      });
                      doc['add'](domContentLoaded)['removeClass']('active');
                      chosenSection['add'](chosenMenu)['addClass']('active');
                    }
                  });
                }
              });
            }
          });
        }
        doc.find('.ps-container').scrollTop(0).perfectScrollbar('update');
      }
      window.onpopstate = function(event) {
        var idLinkTo = event.state.section,
          chosenSection = $('#'+idLinkTo),
          chosenMenu = $('a[href="#'+idLinkTo+'"]');
        changeSection(chosenSection,chosenMenu);
      };
      $('.menu-link')['on']('click', function (dataAndEvents) {
        dataAndEvents['preventDefault']();
        var $spy = $(this);
        var collection = $($spy['attr']('href'));
        var collectionId = collection['attr']('id');
        var resp = $('#menu')['find']('a[href="#' + collectionId + '"]');
        var stateObject = {section:collectionId};
        changeSection(collection,resp);
        history.pushState(stateObject,'','');
      });
    }
    
    /*  service */
    function displayServices() {
      var emptyJ = $('.our-services-content-item');
      contentScroll(emptyJ);
      $('a.our-services-item').on('click', function (event) {
        event.preventDefault();
        var serviceData = $(this).data('service');
        emptyJ.filter('#' + serviceData).addClass('is-visible');
      });
      $('.our-services-close').on('click', function (event) {
        event.preventDefault();
        emptyJ.removeClass('is-visible');
      });
    }
    
    /*  портфоліо */
    function portfolioSlider() {
      var sliderContainers = $('.portfolio-wrapper');
      
      if (sliderContainers.length > 0) initBlockSlider(sliderContainers);
      
      function initBlockSlider(sliderContainers) {
        sliderContainers.each(function () {
          var sliderContainer = $(this),
            slides = sliderContainer.children('.portfolio').children('li'),
            sliderPagination = $('.portfolio-navigation').children('li'),
            sliderArrows = $('.portfolio-arrows').children('li'),
            leftArrow = $('.portfolio-left-arr'),
            rightArrow = $('.portfolio-right-arr');

          slides.first().addClass('is-visible');
          sliderPagination.first().addClass('selected');
          leftArrow.hide();
          sliderPagination.on('click', function (event) {
            event.preventDefault();
            var chosenPagination = $(this);
            updateSlider(chosenPagination);
          });
          
          sliderArrows.on('click', function (event) {
            event.preventDefault();
            var chosenArrow = $(this),
              visibleSlide = sliderContainer.find('.is-visible').last(),
              prevSlide = visibleSlide.prev(),
              nextSlide = visibleSlide.next();
            leftArrow.show();
            rightArrow.show();
            switch (chosenArrow.hasClass('portfolio-left-arr')) {
              case true:
                updateSlide(prevSlide);
                if (prevSlide.index() === slides.first().index()) {
                  leftArrow.hide();
                }
                break;
              case false:
                updateSlide(nextSlide);
                if (nextSlide.index() === slides.last().index()) {
                  rightArrow.hide();
                }
                break;
            }
          });
          
          function updateSlide(chosenSlide) {
            chosenSlide.addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');
          }
          
          function updateSlider(chosenPagination) {
            var portfolioData = chosenPagination.find('a').data('portfolio'),
              chosenSlide = slides.filter('#' + portfolioData);
            sliderPagination.removeClass('selected');
            chosenPagination.addClass('selected');
            updateSlide(chosenSlide);
          }
        });
      }
      
      contentScroll($('.portfolio-half').find('div'));
      (
        function paginationCarousel() {
          var paginationArr = $('.portfolio-nav-arr'),
            paginationArrPrev = paginationArr.filter('.prev'),
            paginationArrNext = paginationArr.filter('.next'),
            paginationContainer = $('.portfolio-navigation'),
            paginationItems = paginationContainer.children(),
            fullWidth = 0,
            containerWidth = paginationContainer.width(),
            //strangeCoef = 1.084;//mistake, when calculating width
            strangeCoef = 1.012;//mistake, when calculating width

          paginationItems.each(function(){
            fullWidth += Number($(this).css('width').replace('px',''));
            //console.log($(this).css('width'));
          });
          fullWidth *= strangeCoef;
          var widthToTheEnd = fullWidth - containerWidth,
            ratio = fullWidth / containerWidth,
            transform,
            translateX,
            translatePrev = 0,
            translateNext = 0,
            scrollStep;
          //console.log('ratio - '+ratio+'\n'+'fullWidth - '+fullWidth+'\n'+'widthToTheEnd - '+widthToTheEnd);
          switch (Math.floor(ratio)){
            case 0:
              paginationArr.hide();
              break;
            case 1:
              scrollStep = widthToTheEnd;
              break;
            default:
              scrollStep = widthToTheEnd / Math.ceil(ratio);
          }

          function calculateTranslateX() {
            transform = paginationContainer.css("-webkit-transform") ||
                        paginationContainer.css("-moz-transform") ||
                        paginationContainer.css("-ms-transform") ||
                        paginationContainer.css("-o-transform") ||
                        paginationContainer.css("transform");
            translateX = Number(transform.split(',')[4]);//get value from matrix();

            translatePrev = translateX + scrollStep;
            translateNext = translateX - scrollStep;
            //console.log(translateX + '+' + scrollStep);
          }
          paginationArrPrev.hide();
          paginationArrPrev.on('click', function (event) {
            event.preventDefault();
            if($(this).hasClass('notransition')){
              paginationArr.removeClass('notransition');
              paginationArrNext.show();
              calculateTranslateX();
              setTranslateValue(paginationContainer, translatePrev);
              if (Math.floor(Math.abs(translatePrev)) === 0) {
                paginationArrPrev.hide();
              }
            }
            //console.log('translateX - ' + translateX + '\n' + 'translatePrev - ' + translatePrev);
          });
          paginationArrNext.filter('.notransition').on('click', function (event) {
            event.preventDefault();
            if($(this).hasClass('notransition')){
              paginationArr.removeClass('notransition');
              paginationArrPrev.show();
              calculateTranslateX();
              setTranslateValue(paginationContainer, translateNext);
              if(Math.floor(Math.abs(translateNext))===Math.floor(widthToTheEnd)){
                paginationArrNext.hide();
              }
            }
            //console.log('translateX - '+translateX+'\n'+'translateNext - '+translateNext);
          });

          function setTranslateValue(container, translate) {
            container.css({
              '-moz-transform': 'translateX(' + translate + 'px' + ')',
              '-webkit-transform': 'translateX(' + translate + 'px' + ')',
              '-ms-transform': 'translateX(' + translate + 'px' + ')',
              '-o-transform': 'translateX(' + translate + 'px' + ')',
              'transform': 'translateX(' + translate + 'px' + ')'
            });
            paginationContainer.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              paginationArr.addClass('notransition');
            });
          }
        })();
    }
    
    function inspect() {
      if (_0x4ae1x9) {
        $('input, textarea')['placeholder']({
          customClass: 'ie-placeholder'
        });
      }
    }
    
    'use strict';
    var emptyJ = $('html');
    var $src = $('body');
    var collection = $('#bg');
    var $spy = $('#video');
    var curElem = $('#overlay');
    (function () {
        'use strict';
        if (navigator['userAgent']['match'](/IEMobile\/10\.0/)) {
          var r20 = document['createElement']('style');
          r20['appendChild'](document['createTextNode']('@-ms-viewport{width:auto!important}'));
          document['querySelector']('head')['appendChild'](r20);
        }
      })();
    if (emptyJ['hasClass']('desktop')) {
      emptyJ['addClass']('non-mobile');
      var checkMobile = false;
    } else {
      emptyJ['addClass']('is-mobile');
      checkMobile = true;
    }
    if (emptyJ['hasClass']('ie9')) {
      var _0x4ae1x9 = true
    }
    $(window)['on']('load', function () {
      $('section')['hide']();
      callback();
    });
    $(document)['on']('ready', function () {
      createTable();
      bgvideo();
      domReady();
      uploadContentFiles();
      displayServices();
      portfolioSlider();
      inspect();
    });
  })(jQuery);
