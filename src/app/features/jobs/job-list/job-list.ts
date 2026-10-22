import { Component, inject } from '@angular/core';
import { JobsStore } from '../../../core/jobs-store';
import { JobCard } from '../job-card/job-card';

@Component({
  imports: [JobCard],
  selector: 'app-job-list',
  styleUrl: './job-list.scss',
  templateUrl: './job-list.html',
})
export class JobList {

  protected readonly store = inject(JobsStore);
}