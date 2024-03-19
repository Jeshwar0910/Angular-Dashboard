import { NewToggleService } from './../new-toggle.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public arrayData: any;

  public currentId: any;

  constructor(
    private newtoggel: NewToggleService,
    private Router: Router,
    private http: HttpClient
  ) {}

  myform = new FormGroup({
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

  ngOnInit(): void {}

  toggleFunction() {
    this.newtoggel.toggleFunction();
  }

  onsubmit() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      console.log('Formdata', formData);

      this.http
        .post('http://localhost:8080/api/dashboard/details/add', formData)
        .subscribe((data) => {
          console.log('Posted Data:', data);
        });
      alert('Created Sucessfully');
      this.Router.navigate(['/dashboard']);
      this.toggleFunction();
    }
  }
}
