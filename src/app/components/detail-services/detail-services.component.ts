import { Component, inject } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProposalService } from '../../services/proposal.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-services',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detail-services.component.html',
  styleUrl: './detail-services.component.css'
})
export class DetailServicesComponent {

  id: any;
  service: any;

  readonly lesServices: ServiceService = inject(ServiceService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.act.snapshot.paramMap.get('id');
    this.getServicesProposale();
    this.lesServices.getServiceById(this.id).subscribe(data => {
      console.log(data);
      this.service = data;
    });
  }

  scroll() {
    window.scroll(0, 1000);
  }


  readonly fb: FormBuilder = inject(FormBuilder);
  readonly proposalService: ProposalService = inject(ProposalService);
  readonly userService: UserService = inject(UserService);

  proposaleForm = this.fb.group({
    price: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ],
    days: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ],
    cover: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ]

  })


  proposles: any;
  getServicesProposale() {
    this.proposalService.getProposalByServiceId(this.id).subscribe(data => {
      this.proposles = data;
    });
  }

  sendProposale(){
    const proposaleData = {
      ...this.proposaleForm.value,
      idService: this.id,
      idUser: this.userService.getUserIdFromToken()
    }

    this.proposalService.createProposal(proposaleData).subscribe(data => {
      this.getServicesProposale();
      this.proposaleForm.reset();
    });
  }
}
