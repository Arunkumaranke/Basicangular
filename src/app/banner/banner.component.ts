import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  cartForm;
  cartData;
  constructor(public http: HttpClient,public router: Router) { }


  ngOnInit() {
   
    this.cartForm = new FormGroup({
      "id": new FormControl(),
      "employee_name": new FormControl(),
      "employee_salary": new FormControl(),
      "employee_age": new FormControl(),
      "profile_image": new FormControl()
      })
    this.loadData();

  }
  postBook() {
    console.log(this.cartForm.value);
    this.http.post('http://dummy.restapiexample.com/api/v1/create', this.cartForm.value)
      .toPromise()
      .then((response) => {
        this.cartForm = new FormGroup({
          "id": new FormControl(),
          "employee_name": new FormControl(),
          "employee_salary": new FormControl(),
          "employee_age": new FormControl(),
          "profile_image": new FormControl()
        })
        this.loadData();
        this.router.navigate(['']);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
      );
  }
  loadData() {
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .toPromise()
      .then((response) => {
        this.cartData = response;
      }, (error) => {
        console.log(error);
      }
      );
  }
  deleteBook(id) {
    let result = confirm('Are you sure do you want to delete?');
    if (result == true) {
      console.log(id);
      this.http.delete(`http://dummy.restapiexample.com/api/v1/update/2/${id}`)
        .toPromise()
        .then((response) => {
          console.log(response);
          this.loadData();
        },
          (error) => {
            console.log(error);
          }
          );
    }
  }

}
