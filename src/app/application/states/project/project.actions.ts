import { CreateProjectDto } from "../../../domain/dtos/project/create-project.dto";
import { UpdateProjectDto } from "../../../domain/dtos/project/update-project.dto";
import { ProjectEntity } from "../../../domain/entities/project.entity";
import { StateCallback } from "../../interfaces/StateCallback.interface";

export namespace ProjectActions {


  export class GetAll {
    static readonly type = '[Project] Get All';
    constructor(readonly callback? : StateCallback<ProjectEntity[],string>){}
  }

  export class Update {
    static readonly type = '[Project] Update';
    constructor(readonly dto : UpdateProjectDto, readonly callback? : StateCallback<ProjectEntity,string>){}
  }

  export class Create {
    static readonly type = '[Project] Create';
    constructor(readonly dto : CreateProjectDto, readonly callback? : StateCallback<ProjectEntity,string>){}
  }

  export class Delete {
    static readonly type = '[Project] Delete';
    constructor(readonly id : number, readonly callback? : StateCallback<ProjectEntity,string>){}
  }


}
