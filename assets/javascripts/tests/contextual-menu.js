jasmine.getFixtures().fixturesPath = 'base/assets/javascripts/tests';

describe('Contextual menu', () => {
  beforeEach(function(){
    loadFixtures('component-contextual-menu.html');
  });

  it('should add opened class to button on click', () => {
    document.getElementById('js-contextual-menu-see-more').click();

    expect(document.getElementById('js-contextual-menu-see-more').classList.contains('opened')).toBe(true);
  });
});
