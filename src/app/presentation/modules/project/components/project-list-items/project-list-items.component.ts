import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-list-items',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './project-list-items.component.html',

})
export class ProjectListItemsComponent {

  @Output() onSelectItem = new EventEmitter();

  constructor() { }


  onSelectTable(){
    this.onSelectItem.emit();
  }
 }
