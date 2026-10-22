import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobsStore } from './jobs-store';
import { Job } from './job.model';

const job = (id: string): Job => ({
  id, company: 'Company ' + id, position: 'Dev', status: 'applied', appliedAt: '2026-10-01',
});

describe('JobsStore', () => {
  let store: JobsStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(JobsStore);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads jobs and adds a new one to the top', async () => {
    TestBed.tick(); // запускает ресурс
    http.expectOne('/api/jobs.json').flush([job('1'), job('2')]);
    await new Promise((r) => setTimeout(r));

    expect(store.jobs().map((j) => j.id)).toEqual(['1', '2']);

    store.add(job('3'));
    expect(store.jobs().map((j) => j.id)).toEqual(['3', '1', '2']);
  });
});