import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterLink, ChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  basicData: any;

  ngOnInit() {

    this.basicData = {
      labels: ['Users', 'Services', 'Proposals', 'Acepted Proposals'],
      datasets: [
        {
          label: 'Sales',
          data: [700, 325, 702, 620],
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
          borderWidth: 1,
        },
      ],
    };

  }

}
