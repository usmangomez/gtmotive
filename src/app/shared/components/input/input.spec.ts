import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Input } from './input';

@Component({
  imports: [Input],
  template: `<app-input [control]="control" label="Test" />`,
})
class TestHost {
  control = new FormControl('');
}

describe('Input', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    const inputEl = fixture.nativeElement.querySelector('app-input');
    expect(inputEl).toBeTruthy();
  });
});
