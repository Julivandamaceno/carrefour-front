import Velocity from 'velocity-animate';

(function () {

  const CLOSE_BUTTON = document.getElementById('js-contextual-menu-see-more');

  if (!CLOSE_BUTTON) {
    return;
  }

  CLOSE_BUTTON.addEventListener('click', (e) => {
    const BUTTON = e.target;
    const PLUS_TEXT = 'VER +';
    const MINUS_TEXT = 'VER -'
    const LIST_ITEMS = BUTTON.parentNode.querySelectorAll('.crui-menu--list--item__hidden');

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
