import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  readonly fb: FormBuilder = inject(FormBuilder);
  readonly userService: UserService = inject(UserService);
  readonly router: Router = inject(Router);
  readonly toastr: ToastrService = inject(ToastrService);

  registerForm = this.fb.group({
    firstname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ],
    lastname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ],
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

  createAccount() {
    this.userService.register(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success('Account created successfully!', 'Success');
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('Failed to create account. Please try again.', 'Error');
        console.log(error);
      }
    );
  }
}