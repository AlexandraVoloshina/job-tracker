import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { JOB_STATUS_LABELS, Job } from '../../../core/job.model';

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-job-card',
  styleUrl: './job-card.scss',
  templateUrl: './job-card.html',
})
export class JobCard {
  readonly statusLabels = JOB_STATUS_LABELS;
  readonly job = input.required<Job>();
}
