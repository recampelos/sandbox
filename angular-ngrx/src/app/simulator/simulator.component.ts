import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  
  steps: MenuItem[] = [];

  ngOnInit(): void {
    this.steps = [
      {
        label: 'Condições gerais',
        routerLink: 'general-conditions'
      },
      {
        label: 'Condições particulares'
      }
    ]
  }
}
