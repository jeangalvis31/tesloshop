import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);

  registerForm = this.fb.group({
    fullName: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-ZÀ-ÿ\\s]+$")
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])[A-Za-z\\d!@#\\$%\\^&\\*]{8,}$")
    ]],
    passwordCheck: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });
  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordCheck = form.get('passwordCheck')?.value;

    if (password !== passwordCheck) {
      return { passwordMismatch: true };
    }

    return null;
  }


  onSubmit() {
    this.registerForm.markAllAsTouched();
    console.log("perate")
  }

}
