import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  readonly fb: FormBuilder = inject(FormBuilder);
  readonly userService: UserService = inject(UserService);
  readonly router: Router = inject(Router);
  readonly toastr: ToastrService = inject(ToastrService);

  loginForm = this.fb.group({

    email: [
      '',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]
    ]

  })

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.toastr.success('Login successful!', 'Welcome');
        console.log(response);
        localStorage.setItem('token', response.token); // Stockez le token dans le localStorage
        this.router.navigate(['/client']); // Redirigez vers une page appropriée après la connexion
      },
      (error) => {
        this.toastr.error('Invalid credentials. Please try again.', 'Login Failed');
        console.log(error);
      }
    );
  }


}
