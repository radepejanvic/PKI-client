import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PKI-client';
  showNavBar = true;
  private subscription: Subscription;

  constructor(private navbarService: SharedService) {
    this.subscription = this.navbarService.getNavbarVisibility().subscribe((shouldShow) => {
      this.showNavBar = shouldShow;
    });
  }
  
}
