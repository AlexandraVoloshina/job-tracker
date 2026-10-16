import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobList } from './features/jobs/job-list/job-list';
import { Job } from './core/job.model';

describe('JobList', () => {
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('shows jobs after loading', async () => {
    const fixture = TestBed.createComponent(JobList);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Завантаження');

    const jobs: Job[] = [
      { id: '1', company: 'Acme', position: 'Angular Dev', status: 'applied', appliedAt: '2026-10-01' },
    ];
    httpTesting.expectOne('/api/jobs.json').flush(jobs);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Acme');
  });

  it('shows error message when request fails', async () => {
    const fixture = TestBed.createComponent(JobList);
    fixture.detectChanges();

    httpTesting.expectOne('/api/jobs.json').flush('Server error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Не вдалося завантажити');
  });
});