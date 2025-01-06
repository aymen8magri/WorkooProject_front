import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private URL = 'http://localhost:3000/proposals';
  readonly http: HttpClient = inject(HttpClient);

  createProposal(proposal: any) {
    return this.http.post(`${this.URL}/create`, proposal);
  }

  getProposalByServiceId(serviceId: any) {
    return this.http.get(`${this.URL}/service/${serviceId}`);
  }

  getProposalByUserId(userId: any) {
    return this.http.get(`${this.URL}/my/${userId}`);
  }

  deleteProposal(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  acceptProposal(id: any) {
    return this.http.put(`${this.URL}/${id}`, {});
  }
}
