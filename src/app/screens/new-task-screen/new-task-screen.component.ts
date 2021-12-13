import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskModel from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {
  taskListId: string = "";
  constructor(private taskService : TaskService,
              private router :Router,
              private activatedRoute :ActivatedRoute) {

                this.activatedRoute.params.subscribe((param : Params) =>{
                 this.taskListId = param['taskListId']
                })
               }

  ngOnInit(): void {
  }
  addNewTask(task :string){

    if(task){
      this.taskService.createTaskInsideATaskList(this.taskListId,task).subscribe((TaskData : TaskModel)=> {
         this.router.navigate(['../'] , { relativeTo: this.activatedRoute})
      })
    }else{
        alert("Please Can not Empty Submit Task")
    }
       
  }
}
