import Velocity from 'velocity-animate';

(function () {
  crui('#js-contextual-menu-see-more').click(function (e) {
    const $BUTTON = crui(this);
    const PLUS_TEXT = 'VER +';
    const MINUS_TEXT = 'VER -'
    const LIST_ITEMS = $BUTTON[0].parentNode.querySelectorAll('.crui-menu__list__item--hidden');

    e.preventDefault();

    if ($BUTTON.hasClass('opened')) {
      $BUTTON.html(PLUS_TEXT);
      $BUTTON.removeClass('opened');

      Velocity(LIST_ITEMS, 'fadeOut');

      return;
    }

    $BUTTON.addClass('opened');
    $BUTTON.html(MINUS_TEXT);

    Velocity(LIST_ITEMS, 'fadeIn');
  });
}());
