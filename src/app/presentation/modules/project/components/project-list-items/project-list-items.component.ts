import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectEntity } from '../../../../../domain/entities/project.entity';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';

@Component({
  selector: 'app-project-list-items',
  standalone: true,
  imports: [
    CommonModule,
    ProjectListItemComponent,
  ],
  templateUrl : './project-list-items.component.html',

})
export class ProjectListItemsComponent {

  @Output() onSelectItem = new EventEmitter();
  @Input() projects! : ProjectEntity[];

  constructor() { }


  onSelectTable(project : ProjectEntity){
    this.onSelectItem.emit(project);
  }
 }
