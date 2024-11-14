export class CreateProjectDto {
  constructor(
    readonly name: string,

  ) {

  }



  public static create( props : {[key:string] : any}) {
    const { name } = props;


    if(!name) return ['Name is required', undefined];

    return [undefined, new CreateProjectDto(name)];
  }


}
