export class CertificateNode {
  id: number;
  subject: string;
  parent: number|null;
  level!: number;
  expandable!: boolean;
  children: CertificateNode[];
  constructor(id:number,subject:string, parent: number|null) {
    this.id = id;
    this.subject = subject;
    this.parent = parent;
    this.children = [];
    this.expandable = true;
  }
}
