$(document).ready(function() {

	$("#owl").owlCarousel({ 
			navigation : true, // Show next and prev buttons
			slideSpeed : 300,
			paginationSpeed : 400,
			 autoPlay: true,
			 pagination: false,
			 singleItem:true		
			});

	$("#owl_tab").owlCarousel({ 
			navigation : true, // Show next and prev buttons
			slideSpeed : 300,
			paginationSpeed : 400,
			pagination: true,
			singleItem:true,
			addClassActive: true
		});

	$("#owl_suc").owlCarousel({ 
			navigation : true, // Show next and prev buttons
			slideSpeed : 300,
			paginationSpeed : 400,		
			items: 3,
			// singleItem:true,
			// addClassActive: true,
			pagination: true
		});

	

	// $('header').height($(window).height());


		$('.toggle_but').on('click',function(){
			$('.toggle_but').toggleClass('tog_mnu');
			$('.top_mnu').slideToggle(600);
		});

	
	$('.selected_leng').click(function(){
		$(this).find('.leng_list').slideToggle('fast');	
		$(this).find('i').toggleClass('fa-angle-down fa-angle-up')
	});


	owl_tabs();
	owl_suc();
});

function owl_suc(){
	var eqi = 1;
	$("#owl_suc .owl-item").eq(eqi).addClass('active');

	$('#success .owl-prev').click(function(){
			$("#owl_suc .owl-item").removeClass('active');	
			eqi = eqi-1;
			if(eqi === 0){
				eqi = 4;
			};
			$("#owl_suc .owl-item").eq(eqi).addClass('active');			
			console.log(eqi);

	});	

	$('#success .owl-next').click(function(){
			$("#owl_suc .owl-item").removeClass('active');	
			eqi = eqi+1;				
			console.log(eqi);
			if(eqi === 5){
					eqi = 1;
			};
			$("#owl_suc .owl-item").eq(eqi).addClass('active');		
	});	
}


function owl_tabs(){
	var item = $('#owl_tab .item');
	var itemLangth = item.length;

	for(var i=0; i<itemLangth; i++){
		var tabText = item.eq(i).find('h4').html();
		$('.owl-pagination .owl-page:eq('+ i +') span').append(tabText);
	}
};


function advantages(){
	var el = $('.advantages ul li');
	var elLehgth = el.length;
	for(var i = 0; i<elLehgth; i++){
		el.eq(i).attr('data-num', i+1);
	};

};




var popup = {
	windowH: function(){
		return $(window).height();
	},
	blockPos: function(el){
		$(el).css({
			paddingTop: $(el).height() - (popup.windowH() /2) +'px'
		});	
	},
	init: function(but,block){
		$('header').height(popup.windowH());
		$(but).on('click',function(){	
			$(this).next().append('<span class="fade_out">&#9587;</span>').fadeIn('slow');

			// popup.blockPos(block);

			$('.fade_out').click(function(){
				$(block).fadeOut('slow');
				$(this).detach();
			});
		});
	}
}