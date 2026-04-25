import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../../services/pet';

@Component({
  selector: 'app-pet-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css',
})
export class PetForm {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private petService = inject(Pet);

  petForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    species: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    size: ['', Validators.required],
    description: [''],
    status: ['', Validators.required],
  });

  onSubmit() {
    if (!this.petForm.valid) {
      console.log('invalido');
      return;
    }
    const { name, species, age, size, status, description } = this.petForm.getRawValue();
    const newPet = { name, species, age, size, description, status };
    this.petService.create(newPet).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
    });
  }
}
