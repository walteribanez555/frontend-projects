import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { ProjectListHeaderComponent } from "../../components/project-list-header/project-list-header.component";
import { ProjectListItemsComponent } from "../../components/project-list-items/project-list-items.component";
import { DcDirective } from '../../../shared/directives/dc.directive';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectListHeaderComponent,
    ProjectListItemsComponent,
    DcDirective,
],
  templateUrl : './list.component.html',

})
export class ListComponent  implements OnInit {
  ngOnInit(): void {
  }

  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);



  onAddProject() {
    const addProjectForm : DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Proyecto',
        description: 'Especificaciones necesarias del proyecto a agregar',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'nuevo proyecto',
            title: 'Nombre',
            id : 'name'
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    }

    this.modalService.open(ModalFormComponent, {
      title: `Agregar Doctor`,
      size: 'sm',
      forms: [addProjectForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Guardar',
        },
      ],
    })
  }



}
