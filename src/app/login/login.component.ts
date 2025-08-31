import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private myService:MyServiceService, private router:Router){}

  isAlert:boolean=false;
  isError:boolean=true;
  isSaving:boolean=false;
  alertMsg:String="Testing"
  formData:any={}
  removeAlert(){
    this.isAlert=false
  }
  onSubmit=async ()=>{
    if(!this.formData.user||!this.formData.pass){
      this.isAlert=true;
      this.isError=true;
      this.alertMsg="Every field is required !!"
    }
    else{
      try {
        this.isSaving=true;
        this.isError=false;
        this.isAlert=true;
        this.alertMsg="Signing In...";
        const response=await this.myService.checkLogin(this.formData);
        const id=response._id 
        this.myService.setId(id);
        await this.myService.getData(id); 
        this.isSaving=false; 
        this.alertMsg="Logged In successfully";
        this.myService.setCurrentUser(this.formData.user)
        setTimeout(()=>{
          this.router.navigate(['/user'])
        },500)   
      } catch (error:any) {
        this.isError=true;
        
        if(typeof(error.error)==="string")
          this.alertMsg=error.error;
        else
          this.alertMsg="Something went wrong"
      }
    }
  }
}
