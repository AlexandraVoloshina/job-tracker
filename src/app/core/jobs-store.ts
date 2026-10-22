import { Service, linkedSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Job } from './job.model';

@Service()
export class JobsStore {
  private readonly jobsResource = httpResource<Job[]>(() => '/api/jobs.json');

  // список = данные с сервера, но его можно менять локально
  readonly jobs = linkedSignal<Job[]>(() =>
    this.jobsResource.hasValue() ? this.jobsResource.value() : [],
  );
  readonly isLoading = this.jobsResource.isLoading;
  readonly error = this.jobsResource.error;

  add(job: Job): void {
    this.jobs.update((list) => [job, ...list]);
  }

  reload(): void {
    this.jobsResource.reload();
  }
}