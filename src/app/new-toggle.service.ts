import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewToggleService {
  public arrayData: any;

  constructor(private http:HttpClient) {}

  toggleFunction() {
    var formContainer = document.getElementById('formid');

    if (formContainer?.classList.contains('hidden')) {
      formContainer.classList.remove('hidden');
    } else {
      formContainer?.classList.add('hidden');
    }
  }


  getDataFromDb(){
    this.http.get('http://localhost:8080/api/dashboard/details/').subscribe((result: any) => {
            console.log(result.data);
            this.arrayData = result.data;
          });
  }



}
