import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, Signal, ViewChild } from '@angular/core';
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
import { ProjectFacadeService } from '../../../../../application/facade/project-facade.service';
import { Subject } from 'rxjs';
import { CreateProjectDto } from '../../../../../domain/dtos/project/create-project.dto';
import { UpdateProjectDto } from '../../../../../domain/dtos/project/update-project.dto';
import { ProjectEntity } from '../../../../../domain/entities/project.entity';
import { StatusAction } from '../../../../../application/enums/StatusAction.enum';
import { ProjectListDetailComponent } from '../../components/project-list-detail/project-list-detail.component';
import { DetailListener } from '../../../shared/interfaces/Detail.listener';
import { DialogType, DialogPosition } from '../../../shared/enum/dialog';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';

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


    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando la lista de elementos',
      listener: notifierDialog,
    });


    this.projectFacadeService.getAll({
      onComplete : () => {


      },
      onResult : ( items ) => {
        notifierDialog.next(0);
        this.cdr.detectChanges();

      } ,
      onError : ( e) => {
        notifierDialog.next(0);

        this.dialogService.showError({
          description: 'Error al cargar la lista de elementos',
        })

      },
      onLoading : () => {



      }
    })



  }

  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);
  private projectFacadeService = inject(ProjectFacadeService);
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  projects : Signal<ProjectEntity[]> = this.projectFacadeService.projects;
  statusAction : Signal<StatusAction> = this.projectFacadeService.status;


  onSelectProject(project : ProjectEntity) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      ProjectListDetailComponent,
    );

    const detailListener : DetailListener<ProjectEntity> = {
      close: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      cancel: () => {
        this.dcWrapper.viewContainerRef.clear();
        this.onShowItem = false;
      },
      submit : ( form ) => {
        const dialog = {
          typeDialog: DialogType.isAlert,
          data: {
            title: 'Advertencia',
            description: 'Estas seguro de realizar esta accion',
            icon: 'assets/icons/heroicons/outline/exclamation.svg',
          },
          options: {
            withActions: true,
            position: [DialogPosition.center],
            withBackground: true,
            colorIcon: 'text-red-500',
          },
        };

        this.dialogService.open(dialog).subscribe((resp) => {

          const { id, name, created_at, status} = form.value;

          const [error, dto] = UpdateProjectDto.create({
            id,
            name,
            created_at,
            status,
          });

          if (error) throw new Error(error as string);

          this.updateProject(dto as UpdateProjectDto);
        });
      },
      delete : (id) => {
        const dialog = {
          typeDialog: DialogType.isAlert,
          data: {
            title: 'Advertencia',
            description: 'Estas seguro de realizar esta accion',
            icon: 'assets/icons/heroicons/outline/exclamation.svg',
          },
          options: {
            withActions: true,
            position: [DialogPosition.center],
            withBackground: true,
            colorIcon: 'text-red-500',
          },
        };

        this.dialogService.open(dialog).subscribe((resp) => {
          if( typeof id === 'number') {
            this.deleteProject(id);
          }

          if (typeof id === 'string') {
            this.deleteProject(parseInt(id));
          }
        });
      }
    }

    componentFactory.instance.project = project;

    componentFactory.instance.detailListener = detailListener;
    this.onShowItem = true;
    this.cdr.detectChanges();
    componentFactory.instance.isOpen = true;

  }





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
    }).subscribe((resp) => {
      const { name } = responseModalFormMapper(resp);

      const [error, dto] = CreateProjectDto.create({
        name,
      });

      if (error) {
        this.dialogService.showError({
          description: error as string,
        });
        return;
      }

      this.createProject(dto as CreateProjectDto);
    });
  }


  createProject( dto : CreateProjectDto) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Creando el proyecto',
      listener: notifierDialog,
    });

    this.projectFacadeService.create(dto, {
      onComplete : () => {


      },
      onResult : ( project ) => {
        notifierDialog.next(0);
        this.onShowItem = true;
        this.cdr.detectChanges();
      },
      onError : ( e) => {
        notifierDialog.next(0);
        this.dialogService.showError({
          description: 'Error al crear el proyecto',
        })
      },
      onLoading : () => {

      }
    })
  }


  updateProject( dto : UpdateProjectDto) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Actualizando el proyecto',
      listener: notifierDialog,
    });


    this.projectFacadeService.update(dto, {
      onComplete : () => {
      },
      onResult : ( project ) => {
        notifierDialog.next(0);
        this.cdr.detectChanges();
        this.dialogService.ShowSuccess({
          description: 'Proyecto actualizado correctamente',
        })
      },
      onError : ( e) => {
        notifierDialog.next(0);
        this.dialogService.showError({
          description: 'Error al actualizar el proyecto',
        })
      },

      onLoading : () => {

      }
    })

  }

  deleteProject( id : number) {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Eliminando el proyecto',
      listener: notifierDialog,
    });

    this.projectFacadeService.delete(id, {
      onComplete : () => {
      },
      onResult : ( project ) => {
        notifierDialog.next(0);
        this.cdr.detectChanges();
        this.dialogService.ShowSuccess({
          description: 'Proyecto eliminado correctamente',
        })
      },
      onError : ( e) => {
        notifierDialog.next(0);
        this.dialogService.showError({
          description: 'Error al eliminar el proyecto',
        })
      },
      onLoading : () => {

      }
    })

  }

  getProjects(){
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando la lista de elementos',
      listener: notifierDialog,
    });

    this.projectFacadeService.getAll({
      onComplete : () => {

      },
      onResult : ( items ) => {
        notifierDialog.next(0);
        this.cdr.detectChanges();
      } ,
      onError : ( e) => {
        notifierDialog.next(0);
        this.dialogService.showError({
          description: 'Error al cargar la lista de elementos',
        })

      },
      onLoading : () => {

      }
    })
  }



}
