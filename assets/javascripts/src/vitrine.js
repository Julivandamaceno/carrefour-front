(function ($) {
	$('.crui-favorite').click(function (e) {
		e.preventDefault();

		$(this).addClass('crui-favorite__active')
	});

	$('.crui-cart').click(function (e) {
		e.preventDefault();

		$(this).addClass('crui-cart__active');
	});
}(crui));