export class ProjectAction {
  static readonly type = '[Project] Add item';
  constructor(readonly payload: string) { }
}
