import Velocity from 'velocity-animate';

(function () {
  crui('#js-contextual-menu-see-more').click(function (e) {
    const BUTTON = this;
    const PLUS_TEXT = 'VER +';
    const MINUS_TEXT = 'VER -'
    const LIST_ITEMS = BUTTON.parentNode.querySelectorAll('.crui-menu__list__item--hidden');

    e.preventDefault();

    if (BUTTON.classList.contains('opened')) {
      BUTTON.innerHTML = PLUS_TEXT;
      BUTTON.classList.remove('opened');

      Velocity(LIST_ITEMS, 'fadeOut');

      return;
    }

    BUTTON.classList.add('opened');
    BUTTON.innerHTML = MINUS_TEXT;

    Velocity(LIST_ITEMS, 'fadeIn');
  });
}());
