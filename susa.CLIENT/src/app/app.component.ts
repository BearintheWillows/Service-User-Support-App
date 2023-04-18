import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";
import {IUser} from "./features/user/_interfaces/iUser";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent implements OnInit{

  user$: Observable<IUser> = new Observable<IUser>();
  isLogged$: Observable<boolean> = new Observable<boolean>();

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'Person' },
  ];
   public labels = ['A House'];
  constructor( private userService: UserService, private authServie: AuthenticationService)   {}
     ngOnInit() {
      this.authServie.authStatusListener$.subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.user$ = this.userService.user$;
          this.isLogged$ = this.authServie.authStatusListener$;
        }
      });
    }

}
