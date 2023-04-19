import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-greeter',
  templateUrl: './user-greeter.component.html',
  styleUrls: ['./user-greeter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class UserGreeterComponent  implements OnInit {


  ngOnInit() {}

}
