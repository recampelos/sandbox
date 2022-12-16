import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  
  steps: MenuItem[] = [];

  activeIndex: number = 1;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.steps = [
      {
        label: 'Condições gerais',
        command(event) {
            
        },
      },
      {
        label: 'Condições particulares'
      }
    ]
  }
}
