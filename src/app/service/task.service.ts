import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../component/task/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private addapiUrl = "http://localhost:8081/addTodos";
  private getapiUrl= "http://localhost:8081/getToDos";
  private updateapiUrl="http://localhost:8081/updateTodos";
  private deleteapiUrl = "http://localhost:8081/deletetodos"; 
  private completeApiUrl="http://localhost:8081/getToDosDone/true";
  private inProcessApiUrl="http://localhost:8081/getToDosDone/false";
  private getDeletedApiUrl="http://localhost:8081/getAllDeleted";
  private deleteDeletedApiUrl= "http://localhost:8081/deleteDeletedTodo";


  constructor(private httpclient: HttpClient) 
  {

   }

   createTask(newTask:Task):Observable<Task>{
    return this.httpclient.post<Task>(this.addapiUrl,newTask);
   }

   getAllTasks():Observable<Task[]>{
    return this.httpclient.get<Task[]>(this.inProcessApiUrl);

     
  }

  getAllCompletedTasks():Observable<Task[]>{
    return this.httpclient.get<Task[]>(this.completeApiUrl);

     
  }

  getAllInProcessTasks():Observable<Task[]>{
    return this.httpclient.get<Task[]>(this.inProcessApiUrl);

     
  }

  getAllDeletedTasks():Observable<Task[]>{
    return this.httpclient.get<Task[]>(this.getDeletedApiUrl);

     
  }
  
  // updateTask(taskId : number, updatedTask: Task):Observable<Task>{
  //     return this.httpclient.put<Task>(this.updateapiUrl+'/'+taskId,updatedTask)
  // }

  updateTask(updatedTask: Task):Observable<Task>{
        return this.httpclient.put<Task>(this.updateapiUrl+'/'+updatedTask.id,updatedTask)
    }

  deleteTask(id: number){
    return this.httpclient.delete(this.deleteapiUrl+'/'+id);

  }

  deleteDeletedTask(id: number){
    return this.httpclient.delete(this.deleteDeletedApiUrl+'/'+id);

  }

  //  deleteTask(task: any) {
  //   return this.httpclient.delete(this.deleteapiUrl + "/"+ task.id);
  // }


  

}


