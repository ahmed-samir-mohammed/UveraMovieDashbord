import { OnlyNumbersDirective } from './only-numbers.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('OnlyNumbersDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlyNumbersDirective();
    expect(directive).toBeTruthy();
  });
});
@Component({
  template: `<input type="text" appOnlyNumbers>`
})
class TestComponent {}

describe('OnlyNumbersDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, OnlyNumbersDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.directive(OnlyNumbersDirective)).nativeElement;
  });

  it('should allow number keys', () => {
    const event = new KeyboardEvent('keydown', { key: '1' });
    inputEl.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('should prevent non-number keys', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    inputEl.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should allow control keys', () => {
    const controlKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    controlKeys.forEach(key => {
      const event = new KeyboardEvent('keydown', { key });
      inputEl.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
