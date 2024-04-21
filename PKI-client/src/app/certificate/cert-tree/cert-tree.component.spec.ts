import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTreeComponent } from './cert-tree.component';

describe('CertTreeComponent', () => {
  let component: CertTreeComponent;
  let fixture: ComponentFixture<CertTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertTreeComponent]
    });
    fixture = TestBed.createComponent(CertTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
