import { Component,Input, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
export class ChipsInputExample {
  
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() nom : string = 'zay ve';
  @Input() sexe : string = 'm';
  title:string = 'akory aby';
  tonga:boolean = true;
  count = 5;
  mpianatra = [
    {
      anarana : 'rakoto',
      asa: 'mamboly',
      sexe: 'm'
    },
    {
      anarana : 'randria',
      asa : 'miompy',
      sexe :'m'
    },
    {
      anarana : 'peta',
      asa : 'mivarotra',
      sexe : 'f'
    },
    {
      anarana : 'ranja',
      asa : 'sofera',
      sexe : 'm'
    },
    {
      anarana : 'voangy',
      asa : 'sekretera',
      sexe : 'f'
    },
  ];
  increment(){
    this.count++
  }
  decrement(){
    this.count--
  }
  alumer(){
    this.tonga = !this.tonga
  }
  constructor() { }

  ngOnInit(): void {
  }
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
