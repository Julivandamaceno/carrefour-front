(function ($) {
	$('.crui-favorite').click(function (e) {
		e.preventDefault();

		$(this).toggleClass('crui-favorite__active')
	});

	$('.crui-cart').click(function (e) {
		e.preventDefault();

		$(this).toggleClass('crui-cart__active');
	});
}(crui));