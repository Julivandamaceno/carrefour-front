jasmine.getFixtures().fixturesPath = 'base/assets/javascripts/tests';

beforeEach(function(){
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
    });

    describe('Visibility Helpers', () => {
      it('should hide element', () => {
        let element = document.getElementById('test');
        
        crui('#test').hide();

        expect(element).toBeHidden();
      });

      it('should hide element', () => {
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
});

describe('Events', () => {
  describe('Simple click', () => {
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
});
