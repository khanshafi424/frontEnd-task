import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import TaskModel from './models/task';
import TaskListModel from './models/tasklistModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  // get TaskList api call
  getTaskList(url:string){
    return this.http.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }
  // get Task api call
  getTasks(url:string){
    return this.http.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  //post api

  postTaskList(url:string , data:Object){
    return this.http.post<TaskListModel>(`${this.API_BASE_URL}/${url} `, data)
  }

  postTask(url:string , data:Object){
    return this.http.post<TaskModel>(`${this.API_BASE_URL}/${url} `, data)
  }


  //put api
  put(url:string , data:Object){
    return this.http.put(`${this.API_BASE_URL}/${url} `, data)
  }
  //put api
 patch(url:string , data:Object){
    return this.http.patch(`${this.API_BASE_URL}/${url} `, data)
  }

  // delete api
 delete(url:string){
    return this.http.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }


  // delete api
 deleteTask(url:string){
  return this.http.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
}
}
