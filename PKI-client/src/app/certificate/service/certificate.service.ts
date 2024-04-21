import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Certificate} from "../model/certificate.model";
import {HttpClient} from "@angular/common/http";
import {CertificateNode} from "../model/certificate-node.nodel";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private apiUrl:string = 'http://localhost:8080/api/certificates';

  constructor(private http: HttpClient) { }

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl);
  }

  // TEST DATA
  getAllCertificates1(): Observable<Certificate[]> {
    const retVal: Certificate[] = [
      {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "ROOT", valid: true, issuer: undefined},
      {id: 2, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "CE 1", valid: true, issuer: {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "string", valid: true, issuer: undefined}},
      {id: 3, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "CE 2", valid: true, issuer: {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "string", valid: true, issuer: undefined}},
      {id: 4, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "EE 1 1", valid: true, issuer: {id: 2, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "CE 1", valid: true, issuer: {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "string", valid: true, issuer: undefined}}},
      {id: 5, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "EE 1 2", valid: true, issuer: {id: 2, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "CE 1", valid: true, issuer: {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "string", valid: true, issuer: undefined}}},
      {id: 6, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "EE 2 1", valid: true, issuer: {id: 3, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "CE 2", valid: true, issuer: {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subject: "string", valid: true, issuer: undefined}}},
    ];
    return of(retVal);
  }

  getCertificateById(id: number): Observable<Certificate> {
    const url:string = `${this.apiUrl}/${id}`
    return this.http.get<Certificate>(url);
  }


  createCertificateNode(cert: Certificate): CertificateNode{
    if(cert.issuer){
      return new CertificateNode(cert.id, cert.subject, cert.issuer.id);
    }
    return new CertificateNode(cert.id, cert.subject, null);
  }
}
