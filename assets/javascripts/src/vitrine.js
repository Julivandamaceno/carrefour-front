(function ($) {
	$('.crui-favorite').click(function (e) {
		e.preventDefault();

		this.classList.add('crui-favorite__active');
	});

	$('.crui-cart').click(function (e) {
		e.preventDefault();

		this.classList.add('crui-cart__active');
	});
}(crui));