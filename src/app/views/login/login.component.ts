import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]),
    password: new FormControl('', Validators.required),
    userType: new FormControl('user', Validators.required) // Añadido para seleccionar el tipo de usuario
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  onSubmit() {
    this.login();
  }

  login() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    const userTypeControl = this.loginForm.get('userType');

    if (this.loginForm.valid) {
      const email = emailControl?.value ?? '';
      const password = passwordControl?.value ?? '';
      const userType = userTypeControl?.value ?? 'user';

      if (userType === 'user') {
        // Intentar login como User
        this.authService.login(email, password).subscribe({
          next: (response: any) => {
            if (response) {
              const user = response.user;
              const redirectUrl = response.redirectUrl;
              this.authService.isLoggedIn = true;
              this.userService.login(user as User); // Cast to User
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.showMessage('Correo y/o contraseña incorrectos.', 'error');
              this.setInvalidClass(emailControl, passwordControl);
            }
          },
          error: error => {
            console.error('Error al intentar iniciar sesión:', error);
            this.showMessage('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.', 'error');
            this.setInvalidClass(emailControl, passwordControl);
          }
        });
      } else {
        // Intentar login como UserCompany
        this.authService.loginCompany(email, password).subscribe({
          next: (response: any) => {
            if (response) {
              const userCompany = response.userCompany;
              const redirectUrl = response.redirectUrl;
              this.authService.isLoggedIn = true;
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.showMessage('Correo y/o contraseña incorrectos.', 'error');
              this.setInvalidClass(emailControl, passwordControl);
            }
          },
          error: error => {
            console.error('Error al intentar iniciar sesión como empresa:', error);
            this.showMessage('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.', 'error');
            this.setInvalidClass(emailControl, passwordControl);
          }
        });
      }
    } else {
      if (emailControl?.hasError('pattern')) {
        this.showMessage('El correo debe contener un "@" válido.', 'error');
      } else {
        this.showMessage('Formulario inválido. Por favor, revisa los campos.', 'error');
      }
      this.setInvalidClass(emailControl, passwordControl);
    }
  }

  setInvalidClass(emailControl: AbstractControl<string | null> | null, passwordControl: AbstractControl<string | null> | null) {
    if (emailControl?.invalid) {
      emailControl.markAsTouched();
    }
  
    if (passwordControl?.invalid) {
      passwordControl.markAsTouched();
    }
  }

  showMessage(message: string, type: 'success' | 'error') {
    const messageDiv = document.getElementById(type === 'success' ? 'message' : 'error-message');
    if (messageDiv) {
      messageDiv.textContent = message;
      messageDiv.style.display = 'block';
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  }

  isRegisterRoute(): boolean {
    return this.router.url === "/register";
  }

  registrarse() {
    this.router.navigateByUrl("/register");
  }
}