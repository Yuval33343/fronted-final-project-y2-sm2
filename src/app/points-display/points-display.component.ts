import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-points-display',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './points-display.component.html',
  styleUrl: './points-display.component.css'
})
export class PointsDisplayComponent {
  @Input() points: number = 0;
}