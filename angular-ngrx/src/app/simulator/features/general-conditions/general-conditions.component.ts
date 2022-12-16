import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

export interface Item {
  code: string,
  description: string
}

@Component({
  selector: 'app-general-conditions',
  templateUrl: './general-conditions.component.html',
  styleUrls: ['./general-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralConditionsComponent implements OnInit {

  items: Item[] = [];

  ngOnInit(): void {
    this.items = [
      {
        code: 'Code 1',
        description: 'Description 1'
      },{
        code: 'Code 2',
        description: 'Description 2'
      },{
        code: 'Code 3',
        description: 'Description 3'
      }
    ]
  }
}
