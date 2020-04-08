$(function(){


	let menuToggleStatus = false;
	$('.menu-toggle').click(function() {
		if (!menuToggleStatus) {
			$(this).css({"transform" : "rotate(90deg)"});
			menuToggleStatus = true;
		}
		else {
			$(this).css({"transform" : "rotate(0deg)"});
			menuToggleStatus = false;
		}
			
		$('.main-menu').slideToggle();
	})




	$('.tabs a').click(function(){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		let id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		return false
	});

	$(".banner-slider, .testimonial-slider").slick({
		arrows: false,
		dots: true
	});

	$(".portfolio-slider").slick({
		dots: true,
		appendArrows: ".portfolio-slider__buttons",
		prevArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-right"></i></button>',
		responsive: [
		    {
		      breakpoint: 800,
		      settings: {
		        dots: false
		      }
		    }
		]
	});

	

	$(window).on("resize load", function(){
		if ( $(window).width() > 800 ) {
			if ( $('.nav-tab-list').hasClass("slick-initialized")) {
				$('.nav-tab-list').slick('unslick');
			}
		}
		else if ( !($('.nav-tab-list').hasClass("slick-initialized")) ) {
			$('.nav-tab-list').slick({
				dots: false,
				arrows: true,
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
			});
		}
	});

	$('.nav-tab-list').on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).find('.slick-current').siblings().removeClass('active');
		$(this).find('.slick-current').addClass('active');
		let id = $(this).find('.active').find('.nav-tab-list__link').attr('href')
		$(id).removeClass('hide');
		return false
	})


});

// alert(window.screen.width);

   


