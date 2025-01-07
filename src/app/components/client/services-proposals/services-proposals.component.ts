import { Component, inject } from '@angular/core';
import { ProposalService } from '../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-proposals',
  standalone: true,
  imports: [],
  templateUrl: './services-proposals.component.html',
  styleUrl: './services-proposals.component.css'
})
export class ServicesProposalsComponent {

  id: any;
  proposal: any;

  readonly proposalService: ProposalService = inject(ProposalService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.act.snapshot.paramMap.get('id');
    this.proposalService.getProposalByServiceId(this.id).subscribe(data => {
      this.proposal = data;
      console.log(this.proposal);
    }
    )
  }


  deleteProposal(id: any) {
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

        this.proposalService.deleteProposal(id).subscribe(() => {
          this.ngOnInit();
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }


  acceptProposal(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to acceptProposal this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept Proposal it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.proposalService.acceptProposal(id).subscribe(() => {
          this.ngOnInit();
        });

        Swal.fire({
          title: "accepted!",
          text: "Your Proposal has been accepted.",
          icon: "success"
        });
      }
    });
  }
}
