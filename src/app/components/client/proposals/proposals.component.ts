import { Component, inject } from '@angular/core';
import { ProposalService } from '../../../services/proposal.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent {

  proposals: any;

  readonly proposalService: ProposalService = inject(ProposalService);
  readonly userService: UserService = inject(UserService);

  ngOnInit() {
    this.proposalService.getProposalByUserId(this.userService.getUserIdFromToken()).subscribe((data: any) => {
      this.proposals = data;
    });
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


}
