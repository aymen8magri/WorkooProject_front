import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private URL = 'http://localhost:3000/services';
  readonly http: HttpClient = inject(HttpClient);

  createService(serviceData: any) {  
    return this.http.post(`${this.URL}/create`, serviceData);
  }

  getServices() {
    return this.http.get(`${this.URL}/`);
  }

  getServiceById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  getMyServices(userId: any) {
    return this.http.get(`${this.URL}/my/${userId}`);
  }

  deleteService(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
