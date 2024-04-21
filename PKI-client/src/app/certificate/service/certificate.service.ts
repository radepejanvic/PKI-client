import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Certificate, CertificateType} from "../model/certificate.model";
import {HttpClient} from "@angular/common/http";
import {CertificateNode} from "../model/certificate-node.nodel";
import { environment } from 'src/env/env';
import { CSR } from '../model/CSR.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(environment.apiHost + "certificates");
  }

  // TEST DATA
  getAllCertificates1(): Observable<Certificate[]> {
    const retVal: Certificate[] = [
      {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "ROOT", valid: true, alias: "ROOT", type: CertificateType.SS, issuerId: 0},
      {id: 2, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "CA 1", valid: true, alias: "CA 1", type: CertificateType.CA, issuerId: 1},
      {id: 3, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "CA 2", valid: true, alias: "CA 2", type: CertificateType.CA, issuerId: 1},
      {id: 4, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 1 1", valid: true, alias: "EE 1 1", type: CertificateType.EE, issuerId: 2},
      {id: 5, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 1 2", valid: true, alias: "EE 1 2", type: CertificateType.EE, issuerId: 2},
      {id: 6, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 2 1", valid: true, alias: "EE 2 1", type: CertificateType.EE, issuerId: 3},
    ];
    return of(retVal);
  }

  getCertificateById(id: number): Observable<Certificate> {
    const url:string = `${environment.apiHost}certificates/${id}`
    return this.http.get<Certificate>(url);
  }

  deleteCertificate(id: number){
    const url:string = `${environment.apiHost}certificates/${id}`
    return this.http.delete(url);
  }


  createCertificateNode(cert: Certificate): CertificateNode{
    if(cert.issuerId != null){
      return new CertificateNode(cert.id, cert.certificateAlias!, cert.issuerId, cert.type);
    }
    return new CertificateNode(cert.id, cert.certificateAlias!, 0, cert.type);
  }

  getAllCSRs(): Observable<CSR[]>{
    const url =  environment.apiHost + `csr`;
    return this.http.get<CSR[]>(url);
  }

  acceptCSR(id: number): Observable<Certificate>{
    const url = environment.apiHost + `certificates/${id}`;
	  return this.http.post<Certificate>(url, {});
  }

  rejectCSR(id: number): Observable<boolean>{
    const url =  environment.apiHost + `csr/${id}`;
    return this.http.delete<boolean>(url);
  }

  createCSR(csr: CSR): Observable<any>{
    const url = environment.apiHost + 'certificates';
    return this.http.post<CSR>(url, csr);
  }

}
