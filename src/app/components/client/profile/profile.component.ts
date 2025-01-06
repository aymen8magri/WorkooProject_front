import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any;
  userId: any;
  image: any;

  readonly fb: FormBuilder = inject(FormBuilder);
  readonly userService: UserService = inject(UserService);
  readonly router: Router = inject(Router);
  readonly toastr: ToastrService = inject(ToastrService);

  updateForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
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
        Validators.minLength(5),
        Validators.maxLength(20),
      ]
    ]

  })

  ngOnInit() {
    this.userId = this.userService.getUserIdFromToken();
    this.userService.getUserById(this.userId).subscribe(
      (response) => {
        this.user = response;
        this.updateForm.reset(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onFileSelected(file: any) {
    this.image = file.target.files[0];
  }


  saveProfile() {
    
    const formData = new FormData();
    
    // Ajout des valeurs du formulaire dans FormData
    formData.append('firstname', this.updateForm.value.firstname || '');
    formData.append('lastname', this.updateForm.value.lastname || '');
    formData.append('email', this.updateForm.value.email || '');
    
    // Ajouter le mot de passe seulement si il est rempli
    if (this.updateForm.value.password) {
      formData.append('password', this.updateForm.value.password);
    }
    
    // Ajouter l'image si elle est présente
    if (this.image) {
      formData.append('image', this.image);
    }
  
    // Envoi de la requête avec FormData
    this.userService.editUser(this.userId, formData).subscribe(
      (response) => {
        // this.toastr.success('Profile updated successfully!', 'Success');
        window.location.reload();  // Recharge la page pour voir les modifications
      },
      (error) => {
        this.toastr.error('Failed to update profile. Please try again.', 'Error');
        console.error(error);
      }
    );
  }
  

}
