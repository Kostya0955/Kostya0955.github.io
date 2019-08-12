
$(document).ready(function () {
  var menuBtn = $('.top-nav_btn')
    var sidebarBtn = $('.left-sidebar_btn')
    var menu = $('.top-nav_menu')
    var sidebarMenu = $('.left-sidebar_menu')
    menuBtn.on('click', function (event) {
    event.preventDefault()
    menu.toggleClass('top-nav_menu__active')
})
    sidebarBtn.on('click', function (event) {
    event.preventDefault()
    sidebarMenu.toggleClass('left-sidebar_menu__active')
})
        $('.direction-blocks').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
  var elem = document.querySelector('.calc-range');
  var init = new Powerange(elem, { min: 100000, max: 3000000, start: 100000, hideRange: true, step: 100000 });
  var per, month, result, total, monthly;
  var money  = +$('.calc-range').val();

  
  $('input[name="programms"]').on('change', function (event) {
    month = +$(this).attr('data-month'); //+делает из строки число
    per = +$(this).attr('data-per');
    result = Math.round(per / 12 * month * money);
    total = result + money;
    monthly = parseInt(result / month);
    $('#total').text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('.calc-monthly span').text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('#month').text(month)
  });
  
    $('.calc-range').on('change', function (event) {
      $('.calc-summ_invest_num span').text($(this).val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
      var radio = $('input[name="programms"]:checked');
      money = +$(this).val();
      month = +radio.attr('data-month'); //+делает из строки число
      per = +radio.attr('data-per');
      result = Math.round(per / 12 * month * money);
      total = result + money;
      monthly = parseInt(result / month);
      $('#total').text(total.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('.calc-monthly span').text(monthly.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    });

})
