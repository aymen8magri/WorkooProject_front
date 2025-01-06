import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  readonly router: Router = inject(Router)
  user: any;
  readonly userService: UserService = inject(UserService);

  ngOnInit() {
    this.user = this.userService.getUserById(this.userService.getUserIdFromToken())
      .subscribe(data => {
        this.user = data;
      });
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
