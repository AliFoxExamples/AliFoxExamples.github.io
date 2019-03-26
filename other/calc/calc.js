jQuery('document').ready(function(){
	
	var x, y;
	
	y = 0;
	
	x = parseInt(x);
	y = parseInt(y);
	
	x = jQuery('#table').html();
	
	// Clear the table;
	
	jQuery('#clear').on('click', function(){
		
		x = 0;
		y = 0;
		
		jQuery('#table').html(x);
		
	});
	
	// The numbers part start;
	
	jQuery('#number9').on('click', function(){
		
		x = String(x);
		x = x + "9";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number8').on('click', function(){
		
		x = String(x);
		x = x + "8";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number7').on('click', function(){
		
		x = String(x);
		x = x + "7";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number6').on('click', function(){
		
		x = String(x);
		x = x + "6";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number5').on('click', function(){
		
		x = String(x);
		x = x + "5";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number4').on('click', function(){
		
		x = String(x);
		x = x + "4";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number3').on('click', function(){
		
		x = String(x);
		x = x + "3";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number2').on('click', function(){
		
		x = String(x);
		x = x + "2";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number1').on('click', function(){
		
		x = String(x);
		x = x + "1";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	jQuery('#number0').on('click', function(){
		
		x = String(x);
		x = x + "0";
		x = parseInt(x);
		
		jQuery('#table').html(x);
		
	});
	
	// The numbers part end;
	
	// SQRT;

	jQuery('#sqrt').on('click', function(){
		
		x = Math.sqrt(x);
		
		jQuery('#table').html(x);
		
	});
	
	// The divide action start;
	
	jQuery('#divide').on('click', function(){
		
		y = x;
		x = 0;
		
		jQuery('#table').html(x);
		
		jQuery('#equals').on('click', function(){
		
			y = y / x;

		
		jQuery('#table').html(y);
		
		});
		
	});
	
	// The divide action end;

	// The multiple action start;
	
	jQuery('#multiply').on('click', function(){
		
		y = x;
		x = 0;
		
		jQuery('#table').html(x);
		
		jQuery('#equals').on('click', function(){
		
			y = y * x;

		
		jQuery('#table').html(y);
		
		});
	});
	
	// The multiple action end;	

	
});