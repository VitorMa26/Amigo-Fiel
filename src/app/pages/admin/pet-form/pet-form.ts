import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../../services/pet';

@Component({
  selector: 'app-pet-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css',
})
export class PetForm implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private petService = inject(Pet);
  private activatedRoute = inject(ActivatedRoute);
  public isEdit = signal<boolean>(false);

  petForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    species: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    size: ['', Validators.required],
    description: [''],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.petService.getOne(id).subscribe({
        next: (res) => {
          this.petForm.get('name')?.setValue(res.name);
          this.petForm.get('species')?.setValue(res.species);
          this.petForm.get('age')?.setValue(res.age);
          this.petForm.get('size')?.setValue(res.size);
          this.petForm.get('description')?.setValue(res.description);
          this.petForm.get('status')?.setValue(res.status);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  onSubmit() {
    if (this.isEdit()) {
      this.handleEdit();
    } else {
      this.handleCreate();
    }
  }

  handleCreate() {
    if (!this.petForm.valid) {
      return;
    }
    const { name, species, age, size, status, description } = this.petForm.getRawValue();
    const newPet = { name, species, age, size, description, status };
    this.petService.create(newPet).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
    });
  }

  handleEdit() {
    if (!this.petForm.valid) {
      return;
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const { name, species, age, size, status, description } = this.petForm.getRawValue();
    const updatedPet = { name, species, age, size, description, status };
    this.petService.save(id, updatedPet).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
    });
  }
}
