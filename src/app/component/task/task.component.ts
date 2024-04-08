import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CdkDragDrop, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarModule } from 'primeng/calendar';
import { CompletedTaskComponent } from '../completed-task/completed-task.component';
import { InProcessComponent } from '../in-process/in-process.component';
import { identifierName } from '@angular/compiler';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';




@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SplitterModule,
    TableModule,
    ToolbarModule,
    MatDialogActions,
    MatDialogModule,
    CreateTaskComponent,
    TabViewModule,
    ToastModule,
    DropdownModule,
    DragDropModule,
    CalendarModule,
    CompletedTaskComponent,
    RouterLink,
    RouterModule
    
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  
})
export class TaskComponent implements OnInit{
  dialog: any;

onDragEnded($event: CdkDragEnd<any>,_t41: any) {
throw new Error('Method not implemented.');
}

onDrop($event: CdkDragDrop<any,any,any>) {
throw new Error('Method not implemented.');
}



AddNew() {
  this.matDialog.open(CreateTaskComponent,{
    width : '350px',
    height: '350px'


  })
  .afterClosed().subscribe((data)=>{
  this.tasks.push(data[0])
  window.location.reload();
  console.log(this.tasks)
})
}

CompletedDialog() {
  this.matDialog.open(CompletedTaskComponent,{
    // width : '1660px',
    // height: '500',
  })
}

InProcessDialog() {
  this.matDialog.open(InProcessComponent,{
    // width : '1660px',
    // height: '500',
  })
}

// edit() {
//   this.matDialog.open(EditTaskComponent,{
//      width : '250px',
     
//   })
// }

  public userName!: string;
constructor(
  private taskService:TaskService,
  private toastr: ToastrService,
  private router : Router,
  private loginService: LoginService,
  private matDialog: MatDialog,
  private cdr: ChangeDetectorRef,
  
  
 
 
  
){

}

visible: boolean = true;
statuses: SelectItem[] | undefined;
actionInProgress: boolean = false;

private isLocalStorageAvailable = typeof localStorage !== 'undefined';

 
viewUser(){
  if (this.isLocalStorageAvailable) {
    
  this.userName =localStorage.getItem('email') || '';
  
  }

}

Logout(){
  this.router.navigateByUrl('/login');
}

CompleteComp(){
  this.router.navigateByUrl('/completed');

}




toastrConfirm(){
  this.toastr.warning('Are you sure?', 'warning')
  {onOk: () => { console.log('Yes') } 
  onCancel: () => { console.log('cancel')}}
}

refreshPage() { 
  window.location.reload(); 
} 
  ngOnInit(): void {
   
    this.viewUser();
    this.taskService.getAllTasks().subscribe(tasks=> this.tasks=tasks);
    this.taskService.getAllCompletedTasks().subscribe(ctasks =>this.ctasks=ctasks);
    this.taskService.getAllDeletedTasks().subscribe(dtasks => this.dtasks =dtasks);
    this.statuses = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
      
  ];

  }

  

newTask:Task={ userName: "", description: "", targetDate: new Date(), done: false};
tasks : Task[] = [];
editingTask: Task|null = null;
updatedTask: Task={userName: "", description: "", targetDate: new Date(), done: false};






createTask(newTask: Task): void {
  this.taskService.createTask(newTask).subscribe(
    createdTask => {
      this.tasks = [...this.tasks, createdTask];
      console.log(this.tasks,"Hello");
    },
    error => {
      console.error('Error creating task:', error);
      alert("Failed to create task. Please try again later.");
    }
  );
  
}

  getAllTasks(){
    this.taskService.getAllTasks().subscribe((tasks)=>{
        this.tasks = tasks;
        
      
    })
  }
  ctasks : Task[] = [];
  getAllCompletedTasks(){
    this.taskService.getAllCompletedTasks().subscribe((ctasks)=>{
        this.ctasks = ctasks;
        
      
    })
  }

  deleteCompletedTask(taskId: any): void {
    console.log(this.ctasks, taskId);
    this.taskService.deleteTask(taskId).subscribe(
        () => {
            // Remove the deleted task from the ctasks array
            console.log(this.ctasks);
            this.ctasks = this.ctasks.filter(task => task.id !== taskId);
            console.log(this.ctasks);
            
            // Show success message
            this.toastr.success('Completed task deleted successfully.');
            this.getAllDeletedTasks();
        },
        error => {
            console.error('Error deleting completed task:', error);
            // Show error message if deletion fails
            this.toastr.error('Failed to delete completed task. Please try again later.');
        }
    );
}

  dtasks : Task[] = [];

  getAllDeletedTasks(){
    this.taskService.getAllDeletedTasks().subscribe((dtasks)=>{
        this.dtasks = dtasks;
        
      
    })
  }

  deleteDeletedTask(taskId: any): void {
    console.log(this.dtasks, taskId);
    this.taskService.deleteDeletedTask(taskId).subscribe(
        () => {
            // Remove the deleted task from the ctasks array
            console.log(this.dtasks);
            this.dtasks = this.dtasks.filter(task => task.id !== taskId);
            console.log(this.dtasks);
            
            // Show success message
            this.toastr.success('Completed task deleted successfully.');
            this.actionInProgress=false;
        },
        error => {
            console.error('Error deleting completed task:', error);
            // Show error message if deletion fails
            this.toastr.error('Failed to delete completed task. Please try again later.');
            this.actionInProgress=false;
        },
        
    );
}
  editTask(task: Task){
    
    this.editingTask = task;
    this.updatedTask = {...task}; //create copy for editing
    console.log("hello")
    
  }

  // updateTask():void{
  //    if(this.editingTask){
  //     this.taskService.updateTask(this.editingTask.id!,this.updatedTask)
  //     .subscribe((result)=>{
  //       const index = this.tasks.findIndex((task)=> task.id
  //       == this.editingTask!.id)
  //       if(index !== -1){
  //         this.tasks[index]=result;
  //         this.cancelEdit();
          
  //       }
  //     })

  //    }
  //    console.log('update')
  // }

  // updateTask(): void {
  //   if (this.editingTask) {
  //     this.taskService.updateTask(this.editingTask.id!, this.updatedTask)
  //       .subscribe((result) => {
  //         console.log('Update result:', result); // Debugging
  //         const index = this.tasks.findIndex((task) => task.id === this.editingTask!.id);
  //         if (index !== -1) {
  //           this.tasks[index] = result;
  //           this.cancelEdit();
  //           console.log('Task updated successfully.'); // Debugging
  //         } else {
  //           console.error('Task not found in the tasks array.'); // Debugging
  //         }
  //       }, (error) => {
  //         console.error('Error updating task:', error); // Error handling
  //       });
  //   } else {
  //     console.error('No editing task found.'); // Debugging
  //   }
  // }

  // cancelEdit(){
  //   this.editingTask = null;
  //   this.updatedTask = {userName:"",description:"",targetDate:new Date(),done:false};
  // }

  
  deleteTask(taskId: any): void {
    const result = window.confirm('Are you sure you want to delete this task?');
    if (result) {
        console.log(this.tasks, taskId);
        this.taskService.deleteTask(taskId).subscribe(
            () => {
                // Remove the deleted task from the tasks array
                console.log(this.tasks);
                this.tasks = this.tasks.filter(tasks => tasks.id !== taskId);
                console.log(this.tasks);
                // Show success message
                this.toastr.success('Task deleted successfully.');
                this.getAllDeletedTasks();

                // Delay before resetting actionInProgress to false

            },
            error => {
                console.error('Error deleting task:', error);
                // Show error message if deletion fails
                this.toastr.error('Failed to delete task. Please try again later.');
                this.actionInProgress=false;
                // Reset actionInProgress to false in case of error

            }
        );
    }
}


  
  clonedTasks: { [s: string]: Task; } = {};
  onRowEditInit(task: Task) {
    if (!this.actionInProgress) {
      this.actionInProgress = true;
       
       console.log('Row edit initialized');
    this.clonedTasks[task.id!] = { ...task };
  }}
  onRowEditSave(task: Task) {
    
    console.log('Row edit saved');
    this.taskService.updateTask(task)
    .subscribe( () => {
      this.ngOnInit();
      alert("Task Updated successfully.");
    });
    this.actionInProgress = false;
   
  }
  onRowEditCancel(task: Task, index: number) {
    console.log('Row edit cancelled');
    this.tasks[index] = this.clonedTasks[task.id!];
    delete this.clonedTasks[task.description];
    this.actionInProgress = false;
  }
  
  // deleteTask(task: Task) {
  //   // console.log('Task Deleted');
     
  //   this.taskService.deleteTask(task)
  //     .subscribe( () => {
  //       this.getAllTasks();
  //       alert("Task Deleted successfully.");
  //     });
      
  // }

  // deleteTask(id:number){
  //   console.log('Deleting Task:');
    
  //       this.taskService.deleteTask(id).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.getAllTasks();
      
  //     });
  // }
}


