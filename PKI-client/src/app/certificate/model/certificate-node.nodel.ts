import {CertificateType} from "./certificate.model";

export class CertificateNode {
  id: number;
  alias: string;
  parent: number|null;
  level!: number;
  expandable!: boolean;
  children: CertificateNode[];
  certificateType: CertificateType;
  constructor(id:number,subject:string, parent: number|null, certificateType: CertificateType) {
    this.id = id;
    this.alias = subject;
    this.parent = parent;
    this.children = [];
    this.expandable = true;
    this.certificateType = certificateType;
  }
}
