import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NewToggleService } from '../new-toggle.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  public formData: any;
  formProfile: string | undefined;
  arrayData: any[] = [];
  convertedArray: any;

  public user: any;

  constructor(
    private newtoggle: NewToggleService,
    private Router: Router,
    private http: HttpClient
  ) {
    this.getDataFromDb();
  }

  ngOnInit(): void {}

  togglebutton() {
    this.newtoggle.toggleFunction();
    this.Router.navigate(['/profile']);
  }

  getDataFromDb() {
    this.http
      .get('http://localhost:8080/api/dashboard/details/')
      .subscribe((result: any) => {
        this.arrayData = result.data;
        this.formData = this.arrayData;
      });
  }

  getId(data: any) {
    this.user = data;
    console.log(this.user);
  }

  saveChanges() {
    let id = this.user;
    let data = this.updatedForm.value;

    this.http
      .put(
        'http://localhost:8080/api/dashboard/details/update' + '/' + id,
        data
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Sucessfully Updated!!');
        location.reload();

        this.getDataFromDb();
      });
  }

  delete(data: any) {
    this.http
      .delete(
        'http://localhost:8080/api/dashboard/details/delete' + '/' + data.id
      )
      .subscribe((resultdata: any) => {
        console.log(resultdata);
        alert('deleted Sucessfully');
        this.getDataFromDb();
      });
  }

  updatedForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    Userpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    ]),
  });
}
