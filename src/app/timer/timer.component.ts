import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() duration: number = 0; // Default to 0 if no input is provided
  @Output() reportTimeLeft = new EventEmitter<number>();

  private intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.duration > 0) {
        this.duration--;
        this.reportTimeLeft.emit(this.duration);
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Method to format duration as MM:SS
  get formattedDuration(): string {
    const minutes: number = Math.floor(this.duration / 60);
    const seconds: number = this.duration % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
  
}