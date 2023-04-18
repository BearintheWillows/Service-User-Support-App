import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {Observable} from "rxjs";
import {IUser} from "./features/user/_interfaces/iUser";
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

  user$: Observable<IUser> = new Observable<IUser>();
  isLogged$: Observable<boolean> = new Observable<boolean>();

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'Person' },
  ];
   public labels = ['A House'];
  constructor(private authServie: AuthenticationService)   {}
     ngOnInit() {

    }

}
