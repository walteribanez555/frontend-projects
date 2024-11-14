import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectEntity } from '../../../../../domain/entities/project.entity';
import { TypeStatusPipe } from "../../../shared/pipes/type-status.pipe";

@Component({
  selector: '[project-list-item]',
  standalone: true,
  imports: [
    CommonModule,
    TypeStatusPipe
],
  templateUrl : './project-list-item.component.html',
})
export class ProjectListItemComponent {

  @Input() project! : ProjectEntity;




}

