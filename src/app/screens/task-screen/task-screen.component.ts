import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskModel from 'src/app/models/task';
import TaskListModel from 'src/app/models/tasklistModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists:TaskListModel[] = [];
  tasks:TaskModel[] = [];
  taskListId:string = '';
  constructor(private taskService : TaskService ,
              private activatedRoute: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe(res => {  
      this.taskLists = res
      // this.router.navigate(['task-list', this.taskLists[0]._id]);
    });

    this.activatedRoute.params.subscribe(
      (param: Params) => {
      this.taskListId = param['id']
      console.log(this.taskListId)
      if(this.taskListId){
         this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
           res => this.tasks =res
        )
      }
    })
  }

  taskClicked(task: TaskModel){
     this.taskService.updateTaskStatus(this.taskListId ,task).subscribe(()=>{
        task.completed = !task.completed
     })
  }

  deleteTask(task :TaskModel){
     this.taskService.deleteAtaskInsideATaskList(this.taskListId , task._id).subscribe(
       (taskDeleted: TaskModel) => {
        this.tasks = this.tasks.filter( t => t._id != taskDeleted._id)
         // Remove the deleted task from the class level tasks
      //    this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
      //     res => this.tasks =res
      //  )
       }
     )
  }

  deleteTaskList(item : TaskListModel){
     this.taskService.deleteTaskList(item._id).subscribe(()=>{
       this.taskLists = this.taskLists.filter(tl => tl._id != item._id);
       console.log(this.taskLists);      
     })
  }

  newAddTask(){

    if(this.taskListId){
      this.router.navigate(['./new-task'], {relativeTo : this.activatedRoute})
    }else{
      alert("Please select the TaskList");
      return
    }
  }
}
