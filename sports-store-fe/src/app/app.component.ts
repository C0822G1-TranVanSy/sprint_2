import { Component } from '@angular/core';
import {TokenStorageService} from './service/security/token-storage.service';
import {SecurityService} from './service/security/security.service';
import {ShareService} from './service/security/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sports-store-fe';
  isLoggedIn = false;
  user: any;

  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private shareService: ShareService) {
  }

  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   *
   */
  ngOnInit(): void {
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
    if (this.tokenStorageService.getToken() != null) {
      this.user = this.tokenStorageService.getUser();
      this.securityService.setIsLoggedIn(this.user, true);
    }
    // this.shareService.sendClickEvent();
  }
}
