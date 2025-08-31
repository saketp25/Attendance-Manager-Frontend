import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  constructor (private myService:MyServiceService){}
  className=this.myService.getCurrentClass();
  total:number=this.myService.getTotal();
  students:{
    name:string,
    roll:string,
    count:number
  }[]=this.myService.getStudents();
  datas:any=this.createData();
  createData(){
    let data=[];
    for(let i=0;i<this.students.length;i++){
      let p=((this.students[i].count*100)/this.total).toFixed(2);
      let k={
        name:this.students[i].name,
        roll:this.students[i].roll,
        count:this.students[i].count,
        percentage:p
      }
      data.push(k);
    }
    return data;
  }
  
  
}
