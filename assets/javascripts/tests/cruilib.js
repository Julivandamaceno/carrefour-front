jasmine.getFixtures().fixturesPath = 'base/assets/javascripts/tests';

beforeEach(() => {
  loadFixtures('crui.html');
});

describe('Selectors', () => {
  describe('Using ID', () => {
    it('should select element by id', () => {
      expect(crui('#test').length).toBe(1);
    });

  });

  describe('Using classes', () => {
    it('should select all elements by class', () => {
      expect(crui('.element').length).toEqual(2);
    });
  });

  describe('Using DOM node', () => {
    it('should select element by NodeList', () => {
      let element = document.querySelectorAll('#test');
      
      expect(crui(element).length).toEqual(1);
    });

    it('should select element by DOM Node', () => {
      let element = document.getElementById('test');
      
      expect(crui(element).length).toEqual(1);
    });
  });

  describe('Node bubbling', () => {
    it ('should return parent node', () => {
      expect(crui('#child-node').parent().length).toBe(1);
      expect(crui('#child-node').parent()[0].id).toBe('parent-tests');
    });

    it ('should return closest node', () => {
      expect(crui('.far-far-node').closest('.closest-node').length).toBe(1);
    });
  });
});

describe('DOM manipulation', () => {
    describe('Class Helpers', () => {
      it('should add class', () => {
        crui('#test').addClass('class-added');

        expect(document.getElementById('test').classList.contains('class-added')).toBeTruthy();
      });

      it('should add class to all elements', () => {
        crui('.element').addClass('class-added');

        let elements = document.querySelectorAll('.element');

        expect(elements[0].classList.contains('class-added')).toBeTruthy();
        expect(elements[1].classList.contains('class-added')).toBeTruthy();
      });

      it('should remove class', () => {
        let element = document.getElementById('test');
        
        crui('#test').removeClass('element-with-id-class');

        expect(element.classList.contains('element-class-two')).toBeFalsy();
      });

      it('should remove class of all elements', () => {
        let elements = document.querySelectorAll('.element-class');

        crui('.element-class').removeClass('element-class-two');

        expect(elements[0].classList.contains('element-class-two')).toBeFalsy();
        expect(elements[1].classList.contains('element-class-two')).toBeFalsy();
      });

      it('should add class to DOM node', () => {
        let element = document.querySelectorAll('#test');
        
        crui(element).addClass('test');
        expect(element[0].classList.contains('test')).toBeTruthy();

        crui(element).removeClass('test');

        let elementWithId = document.getElementById('test');

        crui(elementWithId).addClass('test');

        expect(elementWithId.classList.contains('test')).toBeTruthy();
      });

      it('should verify existence of class', () => {
        expect(crui('#test').hasClass('mytest')).toBeFalsy();

        document.getElementById('test').classList.add('mytest');

        expect(crui('#test').hasClass('mytest')).toBeTruthy();
      });
    });

    describe('Visibility Helpers', () => {
      it('should hide element', () => {
        let element = document.getElementById('test');
        
        crui('#test').hide();

        expect(element).toBeHidden();
      });

      it('should show element', () => {
        let element = document.getElementById('test');
        
        crui('#test').hide();
        crui('#test').show();

        expect(element).toBeVisible();
      });

      it('should toggle element visibility', () => {
        let element = document.getElementById('test');
        
        crui('#test').toggle();
        expect(element).toBeHidden();

        crui('#test').toggle();
        expect(element).toBeVisible();
      });
    });

    describe('Form helpers', () => {
      it('should get input value', () => {
        expect(crui('#my-input').val()).toBe('my-value');
      });

      it('should set input value', () => {
        expect(crui('#my-input').val('my-new-value')).toBe('my-new-value');
      });
    });

    describe('HTML', () => {
      it('should insert HTML', () => {
        const TEXT = 'my html';

        crui('#html-tests').html(TEXT);

        expect(document.getElementById('html-tests').innerHTML).toBe(TEXT);
      });

      it('should return HTML', () => {
        const TEXT = 'my html';

        document.getElementById('html-tests').innerHTML = TEXT;

        expect(crui('#html-tests').html()).toBe(TEXT);
      });
    });
});

describe('Events', () => {
  describe('Click', () => {
    it('should execute callback on element click', () => {
      let event = jasmine.createSpy();

      crui('#test').click(event);
      crui('#test')[0].click();

      expect(event).toHaveBeenCalled();
    });

    it('should trigger element click', () => {
      let event = jasmine.createSpy();

      crui('#test').click(event);
      crui('#test').click();

      expect(event).toHaveBeenCalled();
    });
  });

  describe('Delegate', () => {
    it('should execute callback on element delegated click', () => {
      let event = jasmine.createSpy();

      crui('#realtimeelement').on({
        'click': event
      }, 'body');

      let realTimeElement = document.createElement('div');
      realTimeElement.id = 'realtimeelement';

      document.body.appendChild(realTimeElement);

      crui('#realtimeelement')[0].click();

      expect(event).toHaveBeenCalled();
    });

    afterEach(() => {
      document.body.removeChild(document.getElementById('realtimeelement'));
    });
  });
});

describe('Chaining', () => {
  it('should chain addClass and html methods', () => {
    crui('#html-tests').html('chaining').addClass('chaining-class');

    expect(document.getElementById('html-tests').innerHTML).toBe('chaining');
    expect(document.getElementById('html-tests').classList.contains('chaining-class')).toBeTruthy();
  });
});