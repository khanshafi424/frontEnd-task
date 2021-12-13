import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import TaskListModel from 'src/app/models/tasklistModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.scss']
})
export class NewTaskListScreenComponent implements OnInit {

  constructor(private taskService : TaskService,
              private router :Router) { }

  ngOnInit(): void {
  }

  addNewTaskList(title: string){

    if(title){
          this.taskService.createTaskList(title).subscribe((newTaskList : TaskListModel) =>{
            console.log(newTaskList);
            this.router.navigate(['task-list', newTaskList._id])
          })
    }else{
      alert("Title Can not be Empty");
      return;
    }
      
  }

}
