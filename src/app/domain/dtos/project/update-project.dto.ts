

export class UpdateProjectDto {
  constructor(
    readonly id : number,
    readonly name : string,
    readonly created_at : string,
    readonly status : number,
  ) {
  }

  static create( props : {[key:string] : any}){
    const { id, name ,created_at, status } = props;

    if(!id) return ['Id is required', undefined];

    if(!name) return ['Name is required', undefined];

    if(!created_at) return ['Created_at is required', undefined];

    if(!status) return ['Status is required', undefined];

    return [undefined, new UpdateProjectDto(id, name, created_at, status)];
  }
}
