import { Observable } from 'rxjs';
import { UserService } from './../user/user.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserGreeterComponent } from "./components/user-greeter/user-greeter.component";
import { IUser } from '../user/_interfaces/iUser';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink, RouterLinkActive, UserGreeterComponent]
})
export class MenuComponent  implements OnInit{
  authService: AuthenticationService = inject(AuthenticationService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  public isUserAuthenticated: boolean = false;




  user$: Observable<IUser> = this.userService.getUserName();

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'Person' },
  ];
   public labels = ['A House'];


  constructor() { }

  ngOnInit() {
    this.authService.authStatusListener$.subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
      console.log('isAuthenticated', isAuthenticated);
    });
  }




  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
