import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { HeroComponent } from '../../layout/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
