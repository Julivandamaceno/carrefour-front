import {lory} from 'lory.js';

(function ($) {
	$('.crui-favorite').click(function (e) {
		e.preventDefault();

		$(this).addClass('crui-favorite__active')
	});

	$('.crui-cart').click(function (e) {
		e.preventDefault();

		$(this).addClass('crui-cart__active');
	});

	let carousel = document.querySelector('.js_slider');

	if (carousel) {
		lory(carousel, {
	        rewind: true
	    });
	}
}(crui));