export class FileFlatNode {
    constructor(
      public expandable: boolean,
      public id: string,
      public name: string,
      public parent_id: string,
      public level: number,
    ) {}
  }