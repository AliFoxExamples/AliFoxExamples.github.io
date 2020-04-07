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
		var id = $(this).attr('href');
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
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-right"></i></button>',
	});
});

// alert(window.screen.width);

   


