jQuery(function($){

$(document).ready(function () {
	// My events 
	var event = 1;
	if (event==1){
		$('#meropriatia').show();
		$('#empty-events').hide();
		$('#empty').hide();
	} else {
		$('#event').attr('href', '#empty-events');
		$('#meropriatia').hide();
		$('#empty-events').show();
	}
// -------------------- Navbar fixed --------------------

	var banner_h = ($("#bannerad_index").length) ? $("#bannerad_index").outerHeight() : 0;
	var navtop = banner_h + $(".header").outerHeight();
	function navfixed(){  
		( $(window).scrollTop()>navtop && ($(window).width()>991 || $(window).width()<768) ) ? $("body").addClass('navfixed') : $("body").removeClass('navfixed');  
	}  
	$(window).scroll( function(){navfixed()} ); 
	$(window).resize( function(){
		banner_h = ($("#bannerad_index").length) ? $("#bannerad_index").outerHeight() : 0;
		navtop = navtop = banner_h + $(".header").outerHeight();
		navfixed();
	}); 
	navfixed();  

// -------------------- Menu mobile --------------------
// Collapse.TRANSITION_DURATION = 350 bootstrap.js

	$('#menu-close').click(function () {
		$('#menu').addClass('collapsingout');
		setTimeout(function() { 
			$('#menu').attr('aria-expanded',false).removeClass('in').removeClass('collapsingout');
			$('[data-target="#menu"]').attr('aria-expanded',false).addClass('collapsed');
			$('#menushade').fadeOut(200);
		}, 350);
	});
	$(document).on('click','[data-target="#menu"]',function(){
		$('#menushade').show();
	});

// -------------------- Login popup --------------------

	$('.login').click(function () {
		if($('#personal').is(':visible')){
			$('#personal').addClass('collapsingout');
			setTimeout(function() { 
				$('#personal').attr('aria-expanded',false).removeClass('in').removeClass('collapsingout');
				$('[data-target="#personal"]').attr('aria-expanded',false).addClass('collapsed');
			}, 100);
		}
		showPopUp($('#popup_login'));
		return false;
	});

	$('.logout').click(function($e) {
		$e.preventDefault();
		$.ajax({
			'url': '/login/?todo=reminder',
			'method' : 'get',
			'dataType': 'json',
			success: function(data) {
				if(data.message.length > 0) {
					var block = $('.reminder');
					block
						.find('.description_reminder')
						.attr('href', data.link)
						.text(data.message)
						.parent()
						.show()
					;
				}
			}
		});

		var popUp = $('#popup_logout');

		showPopUp(popUp);

		popUp.find('input[name="no"]').click(function($e){
			$e.preventDefault();
			hidePopUp();
		})
	});

	function showPopUp(selector) {
		var top = $(document).scrollTop()+50;
		$('.popup_wrapper').css('top',top);
		$('#cover').fadeIn('500');
		$('.popup_wrapper').fadeIn('500');
		selector.fadeIn('500');
		return true;
	}

	function hidePopUp() {
		$('#cover').fadeOut('500');
		$('.popup_wrapper').fadeOut('500');
		$('.popup').fadeOut('500', function() {
			$('.reminder').hide();
		});
	}

	$(document).on('click', function(event){
		if ($(event.target).closest('.login').length) {return;}
		if ($(event.target).closest('.logout').length) {return;}
		if ($(event.target).closest('.popup').length) {return;}
		event.stopPropagation();
		hidePopUp();
	});

// -------------------- Subscribe popup --------------------

	$('.popup_close').on('click', function(event){
		$('#cover').fadeOut('500');
		$('.popup_wrapper').fadeOut('500');
		$('.popup').fadeOut('500');
	});

// -------------------- Slick slider (reviews) --------------------

	$('.row_important').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: false,
		focusOnSelect: true,
		arrows: true,
		dots: true,
		responsive: [
			{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
			},
			{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				arrows: false,
			}
			}
		]
	});

// -------------------- Filter --------------------

	$('.filter_close').click(function(){
		if ($(this).hasClass('filter_choosen')) {
			$(this).closest('.filter_radio_inner').find('input').prop('checked', false);
			$(this).closest('.filter_radio_inner').find('input.all_options').prop('checked', true).change();
			$(this).closest('.filter_radio').addClass('filter_reset');
			$(this).removeClass('filter_choosen');
		} else {
			$(this).closest('.filter_radio').addClass('filter_open');
		}
	});

	$('.filter_radio label').click(function(){
		if (!$(this).closest('.filter_radio').hasClass('filter_open')) {
			$(this).closest('.filter_radio').addClass('filter_open');
		} else {
			var $currentInput = $('#'+$(this).attr('for'));
			if (!$currentInput.prop('checked')) {
				$(this).closest('.filter_radio_inner').find('input').prop('checked', false);
				$currentInput.prop('checked', true).change();
				if ($currentInput.hasClass('all_options')) {
					$(this).closest('.filter_radio').addClass('filter_reset');
					$(this).closest('.filter_radio').find('.filter_close').removeClass('filter_choosen');
				} else {
					$(this).closest('.filter_radio').removeClass('filter_reset');
					$(this).closest('.filter_radio').find('.filter_close').addClass('filter_choosen');
				}
			}
			$(this).closest('.filter_radio').removeClass('filter_open');
		}
		return false;
	});

// -------------------- Checkboxes in filter --------------------

	$('.filter_spec label').click(function(){
		var id = $(this).attr('for');
		if(id == 'spec0') {
			if($('#spec0').prop('checked') == false) {
				$(this).siblings().prop('checked', false);
				$(this).prop('checked', true);
			}
		} else {
			if($('#'+id).prop('checked') == false) {
				$('#spec0').prop('checked', false);
				$(this).prop('checked', true);
			}
		}
	});

// -------------------- Share buttons --------------------

	$('.share > a').click(function(){
		$('.share').toggleClass('share-open');
		return false;
	});
	$(document).on('click', function(event){
		if ($(event.target).closest(".share > a").length) {return;}
		if ($(event.target).closest(".share_btns").length) {return;}
		event.stopPropagation();
		$('.share').removeClass('share-open');
	});

// -------------------- Menu-tabs --------------------

	$('.tab-menu button').click(function () {
		$('.fc-nav').css('left', '0px');
		$('#menushade').fadeIn(200);
	});
	$('.fc-nav .close').click(function () {
		$('.fc-nav').css('left', '-300px');
		$('#menushade').fadeOut(200);
	});

	$(document).on('click', '.fc-nav > li > a', function(event){
		$('.fc-nav').css('left', '-300px');
		$('#menushade').fadeOut(200);
	});

// -------------------- EqualHeights --------------------

	if($(document).width()>767){
		setTimeout(function() { 
			$('.index_job-row1').equalHeights();
			$('.index_job-row2').equalHeights();
			$('.index_job-row3').equalHeights();
		}, 200);
	}

	$('.news_info').equalHeights();

// -------------------- Personal Account h2 --------------------
	
	function h2_fold() {
		if($(document).width()<768){
			$('.personal_jobs h2').click(function () {
				$('.personal_job_list').removeClass('personal_job_list-active');
				$(this).closest('.personal_job_list').addClass('personal_job_list-active');
				var scrollTop = $(this).offset().top - 50;
				$(document).scrollTop(scrollTop);
			});
		} 
	}
	h2_fold();
	$(window).resize( function(){
		h2_fold();
		if($(document).width()>767){
			$('.personal_job_list').removeClass('personal_job_list-active');
		}
	});

// -------------------- Personal menu - mobile --------------------

	var mob_tabs_menu = $('.row_personal_content ul.nav-tabs');
	var tabs_menu_btn = ('#tabs_menu_btn');
	function tabs_position(){
		if(tabs_menu_btn.length && mob_tabs_menu.length) {
			if($(document).width() < 768) {
				$(window).on('scroll.tabs_position', function(){
					var top = $('#tabs_menu_btn').offset().top;
					mob_tabs_menu.css('top', top);
				}); 
			} else {
				$(window).off('scroll.tabs_position');
			}
		}
	}
	tabs_position();
	$(window).resize( function(){
		tabs_position();
	});

	$('#tabs_menu_btn').click(function () {
		mob_tabs_menu.detach().appendTo('body');
		mob_tabs_menu.css('left', '0px');
		$('#menushade').fadeIn(200);
	});
	$('#personal-menu-close').click(function () {
		mob_tabs_menu.css('left', '-767px');
		$('#menushade').fadeOut(200);
	});

	$(document).on('click', '#tabs_menu > li > a', function(event){
		mob_tabs_menu.css('left', '-767px');
		$('#menushade').fadeOut(200);
	});

	$(window).resize( function(){
		if($(document).width() > 767) mob_tabs_menu.detach().prependTo('.row_personal_content > div');
	});

// -------------------- Delete CV --------------------

	$('.cv_list_del').click(function () {
		$('#cvshade').fadeIn(500);
	});
	$('.cv_popup_no').click(function () {
		$('#cvshade').fadeOut(500);
	});

}); //$(document).ready


});