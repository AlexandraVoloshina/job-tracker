import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { JobCard } from './job-card';

registerLocaleData(localeUk);

describe('JobCard', () => {
  let component: JobCard;
  let fixture: ComponentFixture<JobCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCard],
      providers: [{ provide: LOCALE_ID, useValue: 'uk' }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('job', {
      id: '1',
      position: 'Developer',
      company: 'Example',
      salary: 4500,
      status: 'applied',
      appliedAt: '2026-10-01',
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the job details, salary, date, and status', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Developer');
    expect(text).toContain('Example');
    expect(text).toContain('$4 500');
    expect(text).toContain('1 жовт. 2026');
    expect(text).toContain('Відгук надіслано');
  });
});
