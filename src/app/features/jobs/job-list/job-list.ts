import { Component } from '@angular/core';
import { Job } from '../../../core/job.model';
import { httpResource } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-job-list',
  styleUrl: './job-list.scss',
  templateUrl: './job-list.html',
})
export class JobList {

  jobsResource = httpResource<Job[]>(() => '/api/jobs.json');
}