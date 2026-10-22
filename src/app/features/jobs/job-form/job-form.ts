import { Component, inject, signal } from '@angular/core';
import { JobsStore } from '../../../core/jobs-store';
import { Job, JobStatus } from '../../../core/job.model';
import { form, required, min, FormField } from '@angular/forms/signals';

interface JobFormModel {
  company: string;
  position: string;
  salary: number | null;
  status: JobStatus;
}

@Component({
  imports: [FormField],
  selector: 'app-job-form',
  styleUrl: './job-form.scss',
  templateUrl: './job-form.html',
})
export class JobForm {
  protected readonly store = inject(JobsStore);
  readonly job = signal<JobFormModel>({
    company: '',
    position: '',
    salary: null,
    status: 'applied',
  });

  readonly statuses: JobStatus[] = ['applied', 'interview', 'offer', 'rejected'];

  readonly jobForm = form(this.job, (p) => {
    required(p.company, { message: 'Вкажіть компанію' });
    required(p.position, { message: 'Вкажіть посаду' });
    min(p.salary, 0, { message: 'Зарплата не може бути від’ємною' });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.jobForm().invalid()) {
      return;
    }

    const { company, position, status, salary } = this.job();
    const newJob: Job = {
      id: crypto.randomUUID(),
      company,
      position,
      status,
      appliedAt: new Date().toISOString().slice(0, 10),
      ...(salary !== null ? { salary } : {}),
    };

    this.store.add(newJob);

    this.resetForm();
  }

  private resetForm(): void {
    this.job.set({
      company: '',
      position: '',
      salary: null,
      status: 'applied',
    });
  }
}
