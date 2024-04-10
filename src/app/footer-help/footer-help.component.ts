import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-help',
  standalone: true,
  imports: [RouterLink, MatButtonModule,],
  templateUrl: './footer-help.component.html',
  styleUrl: './footer-help.component.css'
})
export class FooterHelpComponent {

}
