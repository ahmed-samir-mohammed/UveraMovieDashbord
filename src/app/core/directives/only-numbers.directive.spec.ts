import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OnlyNumbersDirective } from './only-numbers.directive';

@Component({
  selector: 'app-test',
  template: `<input type="text" appOnlyNumbers />`,
  standalone: true,
  imports: [OnlyNumbersDirective],
})
class TestComponent {}

describe('OnlyNumbersDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  it('should prevent non-number keys', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    if (!input) {
      fail('Input element not found');
      return;
    }

    const event = new KeyboardEvent('keydown', { key: 'a' });
    input.nativeElement.dispatchEvent(event);

    expect(input.nativeElement.value).toBe('');
  });

  it('should allow number keys', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    if (!input) {
      fail('Input element not found');
      return;
    }

    const event = new KeyboardEvent('keydown', { key: '1' });
    input.nativeElement.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });

  it('should allow control keys', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    if (!input) {
      fail('Input element not found');
      return;
    }

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    input.nativeElement.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });
});
