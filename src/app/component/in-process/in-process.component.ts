import { TaskService } from '../../service/task.service';
import { Task } from '../task/task.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-in-process',
  standalone: true,
  imports: [
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
    CommonModule,
    DynamicDialogModule,
    DialogModule,
    AvatarModule
  ],
  templateUrl: './in-process.component.html',
  styleUrl: './in-process.component.css'
})
export class InProcessComponent implements OnInit{

  constructor(
    private taskService: TaskService

  ){

  }
  

  visible: boolean = true;

    showDialog() {
        this.visible = true;
    }
  ngOnInit(): void {
   this.getAllTasks();
  }

  tasks : Task[] = [];
  
  getAllTasks(){
    this.taskService.getAllInProcessTasks().subscribe((tasks)=>{
        this.tasks = tasks;
        
      
    })
  }

}
