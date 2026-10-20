import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { Job } from '../../../core/job.model';

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-job-card',
  styleUrl: './job-card.scss',
  templateUrl: './job-card.html',
})
export class JobCard {
  readonly job = input.required<Job>();
}
