import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {AuthenticationService} from "./core/services/authentication.service";
import { MenuComponent } from "./features/menu/menu.component";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, MenuComponent]
})
export class AppComponent implements OnInit{

     private authService: AuthenticationService = inject(AuthenticationService);

     authenticated: boolean = false;

     ngOnInit() {
      if(this.authService.isAuthenticated()){
        this.authService.changeAuthenticationStatus(true);
        this.authenticated = true;
      } else {
        this.authService.changeAuthenticationStatus(false);
        this.authenticated = false;
      }
    }

}
