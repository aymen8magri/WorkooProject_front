import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  idUser: any;
  image: any;

  readonly fb: FormBuilder = inject(FormBuilder);
  readonly userService: UserService = inject(UserService);
  readonly service: ServiceService = inject(ServiceService);
  readonly router: Router = inject(Router);
  readonly toastr: ToastrService = inject(ToastrService);

  postForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    categorie: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    salary: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  })

  createPost() {
    const formData = new FormData();
    // Ajout des valeurs du formulaire dans FormData
    formData.append('name', this.postForm.value.name || '');
    formData.append('categorie', this.postForm.value.categorie || '');
    formData.append('location', this.postForm.value.location || '');
    formData.append('salary', this.postForm.value.salary || '');
    formData.append('description', this.postForm.value.description || '');
    // Ajouter l'image si elle est présente
    if (this.image) {
      formData.append('image', this.image);
    }
    // Envoi de la requête
    formData.append('idUser', this.userService.getUserIdFromToken());

    this.service.createService(formData).subscribe(
      (response: any) => {
        this.toastr.success('Votre annonce a été publiée avec succès!');
        this.router.navigate(['/client/my-services']);
      }, (error: any) => {
        this.toastr.error('Une erreur est survenue, veuillez réessayer!');
        console.log(error);
      }
    );

  }
  selectImage(event: any) {
    this.image = event.target.files[0];
  }
}
