import { Injectable, importProvidersFrom } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable,  lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private currentUser:String="";
  private currentClass:String="";
  private totalStudents:number=0;
  id:String="";
  classId:string="";
  students:any[]=[];
  private teacherData=[];
  setClassId(id:string){
    this.classId=id;
  }
  getClassId(){
    return this.classId;
  }
  setId(id:string){
    this.id=id;
  }
  getId(){
    return this.id;
  }
  getTotal(){
    return this.totalStudents;
  }
  setTotal(n:number){
    this.totalStudents=n;
  }
  increaseTotal(){
    this.totalStudents=this.totalStudents+1;
  }
  getStudents(){
    return this.students;
  }
  getCurrentClass(){
    return this.currentClass
  }
  setCurrentClass(className:String){
    this.currentClass=className
  }
  getTeacherData(){
    return this.teacherData;
  }
  setTeacherData(data:any){
    this.teacherData=data
  }
  setCurrentUser(userName:String){
    this.currentUser=userName;
  }
  getCurrentUser(){
    return this.currentUser;
  }
  private apiUrl='https://attendance-manager-server.onrender.com'

  constructor(private http:HttpClient) { }

  async postData(data:any):Promise<any>{
    const httpOptions={
      headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
    return await lastValueFrom(this.http.post<any>(`${this.apiUrl}/user/register`,data, httpOptions))
  }

  async checkLogin(data:any):Promise<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return await lastValueFrom(this.http.post<any>(`${this.apiUrl}/user/login`,data,httpOptions))
  }

  async getData(id:any):Promise<any>{
    this.teacherData= await lastValueFrom(this.http.get<any>(`${this.apiUrl}/user/${id}`))
  }
  async saveClasses(data:any):Promise<any>{
    
    try {
      const httpOptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
      this.teacherData= await lastValueFrom(this.http.post<any>(`${this.apiUrl}/user/addclass`,data,httpOptions))
    } catch (error:any) {
      console.log(error.error)
    }
    
  }
  getStudent=async (id:string)=>{
    this.students= await lastValueFrom(this.http.get<any>(`${this.apiUrl}/class/students/${id}`))
  }
  saveAttendance=async (data:any)=>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return await lastValueFrom(this.http.post<any>(`${this.apiUrl}/save`,data,httpOptions))
  }
  saveStudents=async (data:any)=>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return await lastValueFrom(this.http.post<any>(`${this.apiUrl}/save/students`,data,httpOptions))
  }
}
