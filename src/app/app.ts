import { Component } from '@angular/core';
import { JobList } from './features/jobs/job-list/job-list';
import { JobForm } from './features/jobs/job-form/job-form';

@Component({
  selector: 'app-root',
  imports: [JobList, JobForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
