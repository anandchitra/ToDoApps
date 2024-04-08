import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { TaskComponent } from '../task/task.component';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
            HttpClientModule,
            MatButtonModule,
            MatFormFieldModule,
            MatCardModule,
            MatInputModule,
            TaskComponent
            
           
         
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ="";
  password: string ="";

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    
    ) {}

    


  Register(){
    this.router.navigateByUrl('/register');
  }



  showWarning(){
    this.toastr.error(
      'Email does not Exist','Warning',
        
    )
  }

  
 
  Login() {
    console.log(this.email);
    console.log(this.password);
 
    let bodyData = {
      email: this.email,
      password: this.password,
    };
 
        this.http.post("http://localhost:8081/api/v1/employee/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);
 
        if (resultData.message == "Email not exits")
        {
      
          this.showWarning();
    
 
        }
        else if(resultData.message == "Login Success")
    
         {
          localStorage.setItem('email',this.email);
          this.router.navigateByUrl('/task');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }
      });
    }

    
    
}
