import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import { EmployeeModel } from 'src/app/model/employee-model.module';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  logoUrl = "./assets/images/logo.png";
  image1Url = "./assets/profile-images/Ellipse -1.png";
  image2Url = "./assets/profile-images/Ellipse -2.png";
  image3Url = "./assets/profile-images/Ellipse -3.png";
  image4Url = "./assets/profile-images/Ellipse -4.png";

  employee: EmployeeModel = new EmployeeModel(0, "", 0, "", new Date(), [], "", "");
  employeeId: any;
  depart2: any = ["HR", "Sales", "Engineer", "Finance", "Other"];
  tempArr: any = [];

  constructor(
    private router: Router,
    private service: EmployeeServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get("id");
    if (this.employeeId) {
      this.getEmployee();
    }
  }

  onSubmit() {
    console.log(this.employee);
    this.employee.department = this.tempArr;
    this.service.insertEmployee(this.employee).subscribe((data: any) => {
      alert("Employee Added Successfully");
      this.router.navigate([""]);
    });
  }

  checkBoxChange(dptname: any) {
    if (!this.tempArr.includes(dptname)) {
      this.tempArr.push(dptname);
    } else {
      const index = this.tempArr.indexOf(dptname);
      if (index > -1) {
        this.tempArr.splice(index, 1);
      }
    }
  }

  updateEmpData() {
    if (this.employeeId) {
      this.employee.department = this.tempArr;
      this.service.updateEmployeeData(this.employee, this.employeeId).subscribe((data: any) => {
        this.router.navigate([""]);
      });

    }
 
  }

  getEmployee() {
    this.service.getEmployeeById(this.employeeId).subscribe((data: any) => {
      this.employee = data.data;
      console.log(this.employee.employeeId);
    });
  }
}
