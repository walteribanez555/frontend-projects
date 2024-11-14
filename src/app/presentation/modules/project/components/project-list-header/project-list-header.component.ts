import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-list-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './project-list-header.component.html',

})
export class ProjectListHeaderComponent {


  @Output() onAddEvent = new EventEmitter();

  onAddToggle() {
    this.onAddEvent.emit();
  }

 }
