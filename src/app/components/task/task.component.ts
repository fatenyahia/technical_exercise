import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  term:string="";
  p:number=1;
  taskToUpdate:any;
  tasks:any;
  formTask:FormGroup;
  update:boolean=false;
  idTask:string="";
  status:boolean;

  constructor(private taskService: TaskService,
              private fb:FormBuilder,

    ) { }

  ngOnInit(): void {

    this.getTasks();
    this.geneForm();

  }

  save(){
    this.taskService.saveTask(this.formTask.value).subscribe((res:any) => {
      console.log("task saved is : ",res);
      this.getTasks();
      this.resetForm();
      document.getElementById("close").click();
    })
  }

  closeModal(){
    this.update=false;
    this.resetForm();
  }

  geneForm(){
    this.formTask = this.fb.group({
      title : '',
      description : '',
      status : false
    })
  }

  getTasks() {
    this.taskService.getTask().subscribe((res: any) => {
      this.tasks = res;
      console.log("tasks is : ",this.tasks);
      
    })
  }

  deleteTask(task:any){
    this.taskService.deleteTask(task.id).subscribe((res:any) => {
      console.log("task ",task," is Deleted");
      this.getTasks();
    })
  }

  resetForm(){
    this.formTask.patchValue({
      title : '',
      description : '',
      status : false
    })
  }

  updateStatus(status:boolean){
    this.status=status;
     this.formTask.patchValue({
     status : status
   })
  }

  patchValue(task){
    this.status=task.status;
    this.taskToUpdate=task;
    this.idTask=task.id;
   this.update = true;
   this.formTask.patchValue({
     title : task.title,
     description : task.description,
     status : task.status
   })
  }

  updateTask(){
    this.taskService.UpdateTask(this.formTask.value,this.idTask).subscribe((res:any) => {
      this.getTasks();
      this.update=false;
      this.resetForm();
      document.getElementById("close").click();
    })
  }

}
