import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.models';

@Injectable()
export class TaskService {

  constructor(private http:HttpClient) { }

  getTask(technicalSheetNumber: string): Observable<Task> {
    return this.http.get<Task>('assets/task/data.json');
  }
}
