export class CreateProjectDto {
  constructor(
    readonly name: string,

  ) {

  }



  public static create( props : {[key:string] : any}) {
    const { name } = props;


    if(!name && name.length == 0) return ['Name is required', undefined];

    return [undefined, new CreateProjectDto(name)];
  }


}
