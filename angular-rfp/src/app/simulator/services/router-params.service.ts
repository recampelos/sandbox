import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class RouterParamsService {

  clientNumber$ = this.route.params.pipe(
    map(params => params['clientNumber'])
  );

  technicalSheetNumber$ = this.route.params.pipe(
    map(params => params['technicalSheetNumber'])
  );

  constructor(private route: ActivatedRoute) { }
}
