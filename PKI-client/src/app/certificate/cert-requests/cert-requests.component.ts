import { ChangeDetectorRef, Component, NgZone, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CSR } from '../model/CSR.model';
import { CertificateService } from '../service/certificate.service';

@Component({
  selector: 'app-cert-requests',
  templateUrl: './cert-requests.component.html',
  styleUrls: ['./cert-requests.component.css']
})
export class CertRequestsComponent {
  // dialogRef!: MatDialogRef<ReportPopupComponent>;

  requests: CSR[] = [];
  dataSource!: MatTableDataSource<CSR>;
  displayedColumns: string[] = [ 'select', 'commonName', 'organization', 'country', 'email', 'issuerAlias', 'subjectAlias'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  
  isBtnDisabled: boolean = true;


  selection = new SelectionModel<CSR>(true, []);

  selectionToggle(row: any) {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row);
      this.isBtnDisabled = true;
    } else {
      this.selection.clear();
      this.selection.select(row);
      this.isBtnDisabled = false;
    }
  }


  refreshTable():void {
    this.getRequests();
    this.searchForm.reset();
  }

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private cdr:ChangeDetectorRef, private zone: NgZone,
    private matDialog: MatDialog,
    private certificateService: CertificateService) {}

  searchForm: FormGroup = this.fb.group({
    search: [''],
    startDate: [''],
    endDate: [''],
    status: ['']
  });
  
  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void{
    this.certificateService.getAllCSRs().subscribe({
      next: data => {
        console.log(data);
          this.requests = data;
          this.dataSource = new MatTableDataSource<CSR>(this.requests);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
    })
  }
 
  dateWrong:boolean = false;


  onAccept(): void {
    this.certificateService.acceptCSR(this.selection.selected[0].id!).subscribe({
      next: response  => {
          console.log(response)
          this.refreshTable()
      }
    })
  }

  onReject(): void {
    this.certificateService.rejectCSR(this.selection.selected[0].id!).subscribe({
      next: response  => {
          console.log(response)
          this.refreshTable()
      }
    })
  }
}
