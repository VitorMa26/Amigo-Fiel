import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../../services/pet';
import { PetModel } from '../../../models/pets';
import { HttpErrorResponse } from '@angular/common/http';

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
    age: [0, [Validators.required, Validators.min(0)]],
    size: ['', Validators.required],
    description: [''],
    status: ['', Validators.required],
  });



  enviarDados():void{
    const formData = this.petForm.getRawValue() as PetModel

    this.petService.create(formData).subscribe({
      next:()=>{
        alert("cadastro realizado com sucesso!")
        setTimeout(()=> this.router.navigate(["/admin/dashboard"]),100)
      },
      error:(erro:HttpErrorResponse)=>{
        console.error(erro)
      }
    })
  }

  // onSubmit() {
  //   if (!this.petForm.valid) {
  //     return;
  //   }
  //   const { name, species, age, size, status, description } = this.petForm.getRawValue();
  //   const newPet = { name, species, age, size, description, status };
  //   this.petService.create(newPet).subscribe({
  //     next: () => this.router.navigate(['/admin/dashboard']),
  //   });
  // }
}
