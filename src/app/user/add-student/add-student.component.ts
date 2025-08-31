import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  constructor(private myService:MyServiceService,private router:Router){}
  formData:any={}
  isAlert:boolean=false;
  alertMsg:String="";
  loading:boolean=false;
  csvData:any[]=[];
  classid=this.myService.getClassId();
saveStudents=async ()=>{
  this.loading=true;
  for(let i=0;i<this.csvData.length-1;i++){
    if(!this.csvData[i].Name||!this.csvData[i].Roll){
      this.loading=false;
      this.alertMsg="The csv file should contain exact headers as Name and Roll";
      this.isAlert=true;
      setTimeout(()=>{
        this.isAlert=false
      },4000)
      return ;
    }
  }
  
  if(this.formData.name&&this.formData.roll){
    const data={
      Name:this.formData.name,
      Roll:this.formData.roll,
      Count:this.formData.count
    }
    this.csvData.push(data)
  }
  if(this.csvData.length===0){
    this.loading=false;
    this.alertMsg="Please enter student details manually or via csv";
      this.isAlert=true;
      setTimeout(()=>{
        this.isAlert=false
      },4000)
      return ;
  }
  const datas={
    classId:this.classid,
    data:this.csvData
  }

  await this.myService.saveStudents(datas);
  await this.myService.getStudent(this.classid);
  this.loading=false;
  this.router.navigate(['/user/show'])
}
onSelect(event:any){
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
removeAlert=()=>{
  this.isAlert=false;
 }
}
