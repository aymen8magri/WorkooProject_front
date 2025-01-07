import { Component, inject } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {

  service: any;

  readonly LesService: ServiceService = inject(ServiceService);
  readonly userService: UserService = inject(UserService);

  ngOnInit() {

    this.LesService.getMyServices(this.userService.getUserIdFromToken()).subscribe(data => {
      console.log(data);
      this.service = data;
    });

  }

  deleteService(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.LesService.deleteService(id).subscribe(data => {
          this.ngOnInit();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        });

      }
    });
  }

}
