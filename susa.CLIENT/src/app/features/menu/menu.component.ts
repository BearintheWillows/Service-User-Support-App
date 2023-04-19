import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserGreeterComponent} from "./components/user-greeter/user-greeter.component";
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink, RouterLinkActive, UserGreeterComponent]
})
export class MenuComponent  implements OnInit{
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  public isUserAuthenticated: boolean = false;





  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'Person' },
  ];
   public labels = ['A House'];


  constructor() { }

  ngOnInit() {
    this.authService.authStatusListener$.subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }




  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
