import { Component, input } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  public readonly control = input<FormControl>();
  public readonly label = input('');
  public readonly type = input('text');
  public readonly placeholder = input('');
  public readonly value = input('', {
    transform: (value) => value?.toString(),
  });
}
