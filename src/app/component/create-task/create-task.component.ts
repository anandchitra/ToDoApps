import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../service/task.service';
import { Task } from '../task/task.model';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TaskComponent,
    MatIconModule,
    CommonModule,
    DialogModule,
    DynamicDialogModule
    
    
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  constructor(

    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    
  ){

  }

  visible: boolean = true;

    showDialog() {
        this.visible = true;
    }

    formatDate(date: Date): string {
      if (date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return '';
    }

newTask:Task={
  userName: "", description: "", targetDate: new Date(), done: false,

};
tasks : Task[] = [];

createTask():void{
  this.taskService.createTask(this.newTask).subscribe((createdTask)=>{
    this.newTask={userName:"",description:"",targetDate:new Date(),done:false}//restart task
    this.tasks.push(createdTask);
    console.log(this.tasks);
    this.dialogRef.close(this.tasks);
  })
}
}
