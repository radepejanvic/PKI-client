export class Certificate{
  id:number;
  serialNumber:number;
  issuedOn:number;
  expiresOn:number;
  subject:string;
  valid:boolean;
  issuer?:Certificate;

  constructor(id: number, serialNumber: number, issuedOn: number, expiresOn: number, subject: string, valid: boolean, issuer: Certificate) {
    this.id = id;
    this.serialNumber = serialNumber;
    this.issuedOn = issuedOn;
    this.expiresOn = expiresOn;
    this.subject = subject;
    this.valid = valid;
    this.issuer = issuer;
  }
}
