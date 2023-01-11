import { Injectable } from '@angular/core';
import { RouterParamsService } from './router-params.service';
import { TaskService } from './api/task.service';
import { filter, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  task$ = this.route.technicalSheetNumber$.pipe(
    filter(number => number !== ''),
    switchMap(number => this.taskService.getTask(number))
  );

  mainActions$ = this.task$.pipe(
    map(task => task.mainActions)
  )

  viewModeActions$ = this.task$.pipe(
    map(task => task.viewModeActions)
  )

  editModeActions$ = this.task$.pipe(
    map(task => task.editModeActions)
  )

  constructor(private route: RouterParamsService, private taskService: TaskService) { }
}
