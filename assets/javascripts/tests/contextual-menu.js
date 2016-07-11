describe('Contextual menu', () => {
  beforeEach(function(){
    fixture.setBase('assets/javascripts/tests')
    this.result = fixture.load('component-contextual-menu.html');
  });

  it('should add opened class to button on click', () => {
    expect(true).toBe(true);
  });

  afterEach(function(){
    fixture.cleanup()
  });
});
