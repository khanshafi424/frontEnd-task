import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskModel from './models/task';
import TaskListModel from './models/tasklistModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService :ApiConfigService) { }


  // to fetch all task lists
  getAllTaskLists(): Observable<TaskListModel[]> {
    return this.apiService.getTaskList('tasklists')
  }

  // to fetch all task 
  getAllTask(taskListId: string): Observable<TaskModel[]> {
    return this.apiService.getTasks(`tasklists${taskListId}`)
  }

  // create a task list bucket
  createTaskList(title: string): Observable<TaskListModel>{
    let data = { 'title': title}
    return this.apiService.postTaskList('tasklists',data)
  }

  // to fetch all task inside list object 
  getAllTasksForATaskList(taskListId: string){
   return  this.apiService.getTasks(`tasklists/${taskListId}/tasks`)

  }

  // create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string , title:string): Observable<TaskModel>{
    let data = { 'title' : title}
   return this.apiService.postTask(`tasklists/${taskListId}/tasks`, data)
  }

  // delete a task list
  deleteTaskList(taskListId: string):Observable<TaskListModel>{
    return this.apiService.delete(`tasklists/${taskListId}`)
  }

  // delete a task inside a particular task list 
  deleteAtaskInsideATaskList(taskListId: string , taskId:string): Observable<TaskModel>{
    return this.apiService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`)
  }

  //update Task status of a task whether its completed or not 

  updateTaskStatus(taskListId: string, taskObject: TaskModel){
    let updateData = { 'completed' : !taskObject.completed}
 return this.apiService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}` , updateData)
  }
}
