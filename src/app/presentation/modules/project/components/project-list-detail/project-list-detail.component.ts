import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ProjectEntity } from '../../../../../domain/entities/project.entity';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { SelectComponent } from '../../../shared/components/custom-inputs/select/select.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-project-list-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl : './project-list-detail.component.html',

  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class ProjectListDetailComponent implements AfterViewInit {

  private cdr = inject(ChangeDetectorRef);

  @Input() project! : ProjectEntity;

  @Input() detailListener? : DetailListener<ProjectEntity>;

  constructor() { }
  ngAfterViewInit(): void {

    if(this.project) {
      this.projectForm.patchValue({
        id : this.project.id,
        name : this.project.name,
        created_at : this.project.created_at,
        status : this.project.status,
      })
    }
    this.cdr.detectChanges();
  }



  isOpen = false;
  statusList : ItemList[] = [
    {
      id : 1,
      name : 'Iniciado',
    },
    {
      id : 2,
      name : 'Proceso',
    },
    {
      id : 3,
      name : 'Realizado',
    }

  ]

  projectForm = new FormGroup({
    id : new FormControl(),
    name : new FormControl(),
    created_at : new FormControl(),
    status : new FormControl(),
  })


  close( ) {
    this.detailListener?.close();
  }

  onSubmit() {
    this.cdr.detectChanges();
    this.detailListener?.submit(this.projectForm);
  }

  onDelete() {
    this.detailListener?.delete(this.project.id);
  }

 }
