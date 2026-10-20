import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import ukLocale from '@angular/common/locales/uk';
import { Job } from '../../../core/job.model';

registerLocaleData(ukLocale);

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-job-card',
  styleUrl: './job-card.scss',
  templateUrl: './job-card.html',
})
export class JobCard {
  job = input.required<Job>();
}
