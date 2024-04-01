import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/model/employee-model.module';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logoUrl="./assets/images/logo.png";
  addUrl="./assets/icons/add-24px.svg";
  deleteUrl="./assets/icons/delete-black-18dp.svg";
  editUrl="./assets/icons/create-black-18dp.svg";
 
  // dataSource:EmployeeModel[]=[]
  
  filteredEmployees: EmployeeModel[] = [];

 
  public employeeDetails: EmployeeModel[] = [];
  
  constructor(    
    private service:EmployeeServiceService,
    private router:Router,
    ) 
    { }

  ngOnInit(): void {
    this.service.getEmployeeData().subscribe( data =>{
      this.employeeDetails= data;
      console.log(data);
    });
  }

  remove(employeeId:number):void{
    this.service.deleteEmployeeData(employeeId).subscribe((data:any) =>{
      this.employeeDetails=data;
      alert("Deleted Successfully");
      this.ngOnInit();
    });
  }

  update(employeeId:number):void{
    this.router.navigate(['update',employeeId]);
  }
  
  filterControl = new FormControl('');

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.toLowerCase();

  //   this.fileredItems = this.items.filter(item => {
  //     return item.property.toLowerCase().includes(filterValue);
  //   });
  // }

  // applyFilter(event: Event) {
    
  //   let filterValue = (event.target as HTMLInputElement).value;
  // //  this.dataSource.filter= filterValue.trim().toLowerCase();

    
  // }
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim().toLocaleUpperCase();

    this.filteredEmployees = this.employeeDetails.filter(employee =>
      employee.name.toLowerCase().includes(filterValue)
    );
  }
  
}
