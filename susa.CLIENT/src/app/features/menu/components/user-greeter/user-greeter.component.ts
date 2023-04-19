import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {Observable} from "rxjs";
import {IUser} from "../../../user/_interfaces/iUser";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-user-greeter',
  templateUrl: './user-greeter.component.html',
  styleUrls: ['./user-greeter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class UserGreeterComponent  implements OnInit {

  userService = inject(UserService);

  user: IUser = {} as IUser;


  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }

}
