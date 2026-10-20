import { Component } from '@angular/core';
import { JobList } from './features/jobs/job-list/job-list';

@Component({
  selector: 'app-root',
  imports: [JobList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
