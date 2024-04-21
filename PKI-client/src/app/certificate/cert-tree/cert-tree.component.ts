import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Certificate, CertificateType} from "../model/certificate.model";
import {CertificateService} from "../service/certificate.service";
import {CertificateNode} from "../model/certificate-node.nodel";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {FormBuilder, Validators} from "@angular/forms";
import {CSR, KeyUsage} from "../model/CSR.model";

@Component({
  selector: 'app-cert-tree',
  templateUrl: './cert-tree.component.html',
  styleUrls: ['./cert-tree.component.css']
})
export class CertTreeComponent  implements OnInit {
  certTree!:CertificateNode[];
  certNodes:CertificateNode[] = [];
  dataSource = new MatTreeNestedDataSource<CertificateNode>();

  certificateData!: any;
  createBy!: any;

  keyUsages: KeyUsage[] = [KeyUsage.KEY_AGREEMENT, KeyUsage.DATA_ENCIPHERMENT, KeyUsage.KEY_ENCIPHERMENT, KeyUsage.DIGITAL_SIGNATURE, KeyUsage.NON_REPUDIATION, KeyUsage.DECIPHER_ONLY, KeyUsage.ENCIPHER_ONLY, KeyUsage.KEY_CERT_SIGN, KeyUsage.CRL_SIGN]

  typesRoot: CertificateType[] = [CertificateType.CA,CertificateType.EE,CertificateType.SS];
  typesCE: CertificateType[] = [CertificateType.CA,CertificateType.EE];

  fb = inject(FormBuilder);
  createCertForm = this.fb.nonNullable.group({
    subjectE: ['', Validators.email],
    subjectCN: ['', Validators.required],
    subjectC: ['', Validators.required],
    subjectO: ['', Validators.required],
    certType: ['', Validators.required],
    subjectAlias: ['', Validators.required],
    digitalSignature: [''],
    nonRepudiation: [''],
    keyEncipherment: [''],
    dataEncipherment: [''],
    keyAgreement: [''],
    certificateSigning: [''],
    crlSigning: [''],
    encipherOnly: [''],
    decipherOnly: [''],
    domain: ['']
  });

  treeControl: NestedTreeControl<CertificateNode>;

  constructor(private certificateService: CertificateService, private cdr: ChangeDetectorRef) {
    this.treeControl = new NestedTreeControl<CertificateNode>(node => node.children);
  }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificateService.getAllCertificates().subscribe(
      (data:Certificate[]) => {
        if(data){
          console.log(data);
          for( let certificate of data){
            const cNode = this.certificateService.createCertificateNode(certificate);
            this.certNodes.push(cNode);
          }
          console.log("NODES")
          console.log(this.certNodes)
          console.log("XXXXXXXXXXXX")
          this.buildTree();
        }
      }
    )}
  buildTree(): void {
    const nodeMap = new Map<number, CertificateNode>();
    const tree: CertificateNode[] = [];
    for(const certNode of this.certNodes){
      if(certNode.parent==1){
        console.log("PARENT ID: "+ certNode.parent)
        this.getById(certNode.parent)?.children.push(certNode);
        nodeMap.set(certNode.id, certNode);
      }
    }
    for (const node of this.certNodes) {
      if (node.parent) {
        const parentNode = nodeMap.get(this.getById(node.parent)?.id ?? -1);
        if (parentNode) {
          parentNode.children.push(node); // Add node as child of its parent
        }
      } else {
        tree.push(node); // Add root node to the tree
      }
    }

    this.dataSource.data = tree;

    // expand all nodes on init
    // tree.forEach(cert => this.expandNode(cert, true));

    console.log(tree);

  }

  hasChild = (_: number, nodeData: CertificateNode) => !!nodeData.children && nodeData.children.length > 0;

  getById(id: number): CertificateNode | undefined {
    for (let node of this.certNodes) {
      if (id == node.id) {
        return node;
      }
    }
    return undefined; // Return undefined if node with the specified ID is not found
  }

  expandNode(node: CertificateNode, isExpanded: boolean) {
    this.treeControl.expand(node);
    node.children.forEach(child => {
      this.expandNode(child, isExpanded);
    });
    this.cdr.detectChanges();
  }

  onNodeClicked(node:CertificateNode){
    this.createBy = null;
    this.certificateData = {
      id: node.id,
      subject: node.alias,
    }
    this.cdr.detectChanges();
  }
  onNodeClickedReal(id:number){
    this.createBy = null;
    this.certificateService.getCertificateById(id).subscribe(
      (data) => {
        if(data){
          this.certificateData = {
            id: data.id,
            subjectCN: data.subjectCN,
            issuedOn: data.issuedOn,
            expiresOn: data.expiresOn,
            valid: data.valid,
            issuerId: data.issuerId,
            subjectC: data.subjectC,
            subjectE: data.subjectE,
            subjectO: data.subjectO
          }
        }
      });
    this.cdr.detectChanges();
  }

  back(){
    this.certificateData = null;
    this.cdr.detectChanges();
  }
  back2(){
    this.createBy = null;
    this.cdr.detectChanges();
  }

  create(node:CertificateNode){
    this.certificateData = null;
    this.createBy = node;
    this.cdr.detectChanges();
  }

  delete(node:CertificateNode){

  }
  archive(node:CertificateNode){

  }

  onSubmit(): void {
    if(this.createCertForm.valid){
      const keyUsages: KeyUsage[] = [];
      if(this.createCertForm.value.crlSigning){keyUsages.push(KeyUsage.CRL_SIGN)}
      if(this.createCertForm.value.decipherOnly){keyUsages.push(KeyUsage.DECIPHER_ONLY)}
      if(this.createCertForm.value.digitalSignature){keyUsages.push(KeyUsage.DIGITAL_SIGNATURE)}
      if(this.createCertForm.value.dataEncipherment){keyUsages.push(KeyUsage.DATA_ENCIPHERMENT)}
      if(this.createCertForm.value.nonRepudiation){keyUsages.push(KeyUsage.NON_REPUDIATION)}
      if(this.createCertForm.value.keyAgreement){keyUsages.push(KeyUsage.KEY_AGREEMENT)}
      if(this.createCertForm.value.keyEncipherment){keyUsages.push(KeyUsage.KEY_ENCIPHERMENT)}
      if(this.createCertForm.value.certificateSigning){keyUsages.push(KeyUsage.KEY_CERT_SIGN)}
      if(this.createCertForm.value.encipherOnly){keyUsages.push(KeyUsage.ENCIPHER_ONLY)}
      const csr: CSR = {
        commonName: this.createCertForm.value.subjectCN?.trim() || "",
        organization: this.createCertForm.value.subjectO?.trim() || "",
        country: this.createCertForm.value.subjectC?.trim() || "",
        email: this.createCertForm.value.subjectE?.trim() || "",
        domainName: this.createCertForm.value.domain?.trim() || "",
        template: this.createCertForm.value.certType,
        keyUsages: keyUsages,
        subjectAlias: this.createCertForm.value.subjectAlias?.trim() || "",
        issuerAlias: this.createBy.alias
      }
      this.certificateService.createCSR(csr);
    }
  }

  protected readonly CertificateType = CertificateType;
}
