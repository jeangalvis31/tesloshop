import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  router = inject(Router);

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


  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordCheck = control.get('passwordCheck')?.value;

    if (password && passwordCheck && password !== passwordCheck) {
      return { passwordMismatch: true };
    }

    return null;
  }


  preventInvalidChars(event: KeyboardEvent) {
    const allowedRegex = /^[a-zA-ZÀ-ÿ\s]$/;

    // Permitir teclas especiales: borrar, flechas, tab, etc.
    const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (
      specialKeys.includes(event.key)
    ) {
      return;
    }

    if (!allowedRegex.test(event.key)) {
      event.preventDefault();
    }
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const registerUser: RegisterUser = {
      fullName: this.registerForm.value.fullName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    this.authService.register(registerUser).subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
    })
  }

}
