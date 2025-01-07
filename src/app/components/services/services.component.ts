import { Component, inject } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  readonly lesServices: ServiceService= inject(ServiceService);
  service: any;


  ngOnInit() {
    this.lesServices.getServices().subscribe(data => {
      this.service = data;
    });
  }

}
