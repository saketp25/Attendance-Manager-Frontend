import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { Router } from '@angular/router';
import { every } from 'rxjs';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
constructor(private myService:MyServiceService ,private router:Router){}
formData:any={};
isAlert:boolean=false
alertMsg:String="";
loading:boolean=false;
user:String=this.myService.getCurrentUser();

csvData:any[]=[]

removeAlert=()=>{
  this.isAlert=false;
 }

onSelect=(event:any):void=>{
  const file = event.target.files[0];
  if(file.type!='text/csv')
    {
      this.alertMsg="File type should be csv";
      this.isAlert=true;
      setTimeout(()=>{
        this.isAlert=false
      },3000)
      return;
    }
  const reader = new FileReader();

  reader.onload = () => {
    const csvData = reader.result as string;
    this.csvData = this.csvToArray(csvData);
  };
  reader.readAsText(file);
}
csvToArray(csvData: string): any[] {
  const lines = csvData.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj:any = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

saveClass= async()=>{
  this.loading=true;
  for(let i=0;i<this.csvData.length-1;i++){
    if(!this.csvData[i].Name||!this.csvData[i].Roll){
      this.loading=false;
      this.alertMsg="The csv file should contain exact headers as Name and Roll";
      this.isAlert=true;
      setTimeout(()=>{
        this.isAlert=false
      },3000)
      return ;
    }
  }
 const data={
  user:this.user,
  className:this.formData.name,
  Total:this.formData.total,
  data:this.csvData
 }
  await this.myService.saveClasses(data)
  this.loading=false;
  this.router.navigate(['/user'])
}
}
