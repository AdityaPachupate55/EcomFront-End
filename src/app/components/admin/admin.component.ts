import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-admin',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

}
