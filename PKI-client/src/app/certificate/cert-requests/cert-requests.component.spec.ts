import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertRequestsComponent } from './cert-requests.component';

describe('CertRequestsComponent', () => {
  let component: CertRequestsComponent;
  let fixture: ComponentFixture<CertRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertRequestsComponent]
    });
    fixture = TestBed.createComponent(CertRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
