import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [

    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  employeename: string ="";
  email: string ="";
  password: string ="";
  constructor(
    private router:Router,
    private http: HttpClient )
  {
  }

  


  Register(){
  this.router.navigateByUrl('/register');
  
}

  Login(){
    this.router.navigateByUrl('/login');
    
  }

  


  save()
  
  {
  
    let bodyData = {
      "employeename" : this.employeename,
      "email" : this.email,
      "password" : this.password
      
    };
    this.http.post("http://localhost:8081/api/v1/employee/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        if (bodyData.employeename =="" || bodyData.email == "" || bodyData.password=="" )
        {
      
          alert("Please enter the details!");
    
         }
         else 
    
         {
          alert("Employee Registered Successfully");
          this.router.navigateByUrl('/task');
        }
        
    });
  }

}
