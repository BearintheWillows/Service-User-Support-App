import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationFormComponent } from "../components/authentication-form/authentication-form.component";

@Component({
    selector: 'app-login',
    templateUrl: './login-user.page.html',
    styleUrls: ['./login-user.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, AuthenticationFormComponent]
})
export class LoginUserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
