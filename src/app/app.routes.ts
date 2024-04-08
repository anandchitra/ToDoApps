import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { TaskComponent } from './component/task/task.component';
import { CreateTaskComponent } from './component/create-task/create-task.component';
import { CompletedTaskComponent } from './component/completed-task/completed-task.component';

export const routes: Routes = [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      
      {
      path: 'home',
      component: HomeComponent,
      },

      {
      
      path: 'register',
      component: RegisterComponent,
      },

      {
        path: 'task',
        component: TaskComponent
      },
      {
        path: 'create',
        component: CreateTaskComponent
      },
      {
        path: 'completed',
        component: CompletedTaskComponent
      }

];
