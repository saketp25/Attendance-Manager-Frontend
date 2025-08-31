import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isAlert:boolean=false
  isError:boolean=false;
  isSaving:boolean=false;
  alertMsg:String="";
  formData:any={}
  constructor(private myService:MyServiceService,private router:Router){}
  onSubmit=async()=>{
  if(!this.formData.fName||!this.formData.lName||!this.formData.user||!this.formData.pass){
    this.isError=true;
    this.isAlert=true;
    this.alertMsg="Every field is required"
  }
  else{
    try {
      this.isAlert=true;
      this.isSaving=true;
      this.isError=false;
      this.alertMsg="Saving..."
      await this.myService.postData(this.formData)
      this.isSaving=false;
      this.alertMsg="Registration successful"
      setTimeout(()=>{
        this.router.navigate(['/login'])
      },1000)
      
      
    } catch (error:any) {
      this.isSaving=false;
      this.isError=true;
      let err=error.error;
      if(typeof(err)!="string"){
        this.alertMsg="Couldn't save"
      }else{
        this.alertMsg=err;
      }
      console.log(this.alertMsg)
      console.log(error)
    }
    
  }
}
removeAlert=()=>{
 this.isAlert=false;
}
}
