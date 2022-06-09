import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTask(){
    return this.http.get(`${environment.baseURL}/task/`)
  }

  saveTask(task:any){
    return this.http.post(`${environment.baseURL}/task/save`,task)
  }

  deleteTask(id:any){
    return this.http.delete(`${environment.baseURL}/task/${id}`)
  }

  getById(id:any){
    return this.http.get(`${environment.baseURL}/task/${id}`)
  }

  UpdateTask(task:any,id:any){
    return this.http.put(`${environment.baseURL}/task/${id}`,task)
  }

}
