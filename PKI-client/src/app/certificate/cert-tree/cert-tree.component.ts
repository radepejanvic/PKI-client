import {Component, OnInit} from '@angular/core';
import {Certificate} from "../model/certificate.model";
import {CertificateService} from "../service/certificate.service";
import {Observable} from "rxjs";
import {CertificateNode} from "../model/certificate-node.nodel";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

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

  treeControl: NestedTreeControl<CertificateNode>;

  constructor(private certificateService: CertificateService) {
    this.treeControl = new NestedTreeControl<CertificateNode>(node => node.children);
  }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificateService.getAllCertificates1().subscribe(
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
  }

  onNodeClicked(node:CertificateNode){

    this.certificateData = {
      id: node.id,
      subject: node.subject,
    }
  }
  onNodeClickedReal(id:number){
    this.certificateService.getCertificateById(id).subscribe(
      (data) => {
        if(data){
          this.certificateData = {
            id: data.id,
            subject: data.subject,
            issuedOn: data.issuedOn,
            expiresOn: data.expiresOn,
            valid: data.valid,
            issuer: data.issuer
          }
        }
      })
  }

  back(){
    this.certificateData = null
  }
  back2(){
    this.createBy = null
  }

  create(node:CertificateNode){
    this.createBy = node;
  }
}
