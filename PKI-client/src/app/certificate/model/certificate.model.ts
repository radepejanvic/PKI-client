export class Certificate{
  id:number;
  serialNumber?:number;
  issuedOn:number;
  expiresOn:number;
  subjectCN:string;
  subjectO?:string;
  subjectC?:string;
  subjectE?:string;
  issuerCN?:string;
  issuerO?:string;
  issuerC?:string;
  issuerE?:string;
  valid:boolean;
  alias:string;
  type:CertificateType;
  issuerId:number;
  certificateAlias?:string;
  issuerAlias?: string;

  constructor(id: number, serialNumber: number, issuedOn: number, expiresOn: number, subject: string, valid: boolean, issuer: string, cert: CertificateType, issuerId: number) {
    this.id = id;
    this.serialNumber = serialNumber;
    this.issuedOn = issuedOn;
    this.expiresOn = expiresOn;
    this.subjectCN = subject;
    this.valid = valid;
    this.alias = issuer;
    this.type = cert;
    this.issuerId = issuerId;
  }
}

export enum CertificateType {
  CA="CA", EE="EE", SS="SS"
}
