import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Certificate, CertificateType} from "../model/certificate.model";
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
      {id: 1, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "ROOT", valid: true, alias: "", certificateType: CertificateType.SS, issuerId: 0},
      {id: 2, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "CA 1", valid: true, alias: "ROOT", certificateType: CertificateType.CA, issuerId: 1},
      {id: 3, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "CA 2", valid: true, alias: "ROOT", certificateType: CertificateType.CA, issuerId: 1},
      {id: 4, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 1 1", valid: true, alias: "CA 1", certificateType: CertificateType.EE, issuerId: 2},
      {id: 5, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 1 2", valid: true, alias: "CA 1", certificateType: CertificateType.EE, issuerId: 2},
      {id: 6, serialNumber: 1, issuedOn: 10, expiresOn: 20, subjectCN: "EE 2 1", valid: true, alias: "CA 2", certificateType: CertificateType.EE, issuerId: 3},
    ];
    return of(retVal);
  }

  getCertificateById(id: number): Observable<Certificate> {
    const url:string = `${this.apiUrl}/${id}`
    return this.http.get<Certificate>(url);
  }

  deleteCertificate(id: number){
    const url:string = `${this.apiUrl}/${id}`
    return this.http.delete(url);
  }


  createCertificateNode(cert: Certificate): CertificateNode{
    if(cert.issuerId != 0){
      return new CertificateNode(cert.id, cert.subjectCN, cert.issuerId, cert.certificateType);
    }
    return new CertificateNode(cert.id, cert.subjectCN, null, cert.certificateType);
  }
}
