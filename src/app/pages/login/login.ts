import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    if (this.authService.estaLogado()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit() {
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email!, password!).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () =>
        this.loginForm.get('email')?.setErrors({ serverError: 'Usuário ou senha inválidos' }),
    });
  }
}
