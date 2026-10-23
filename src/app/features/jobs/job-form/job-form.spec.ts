import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsStore } from '../../../core/jobs-store';
import { JobForm } from './job-form';

describe('JobForm', () => {
  let fixture: ComponentFixture<JobForm>;
  let addJob: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    addJob = vi.fn();
    await TestBed.configureTestingModule({
      imports: [JobForm],
      providers: [{ provide: JobsStore, useValue: { add: addJob } }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobForm);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('disables the submit button when the company is empty', async () => {
    setInputValue('position', 'Frontend developer');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = getElement<HTMLButtonElement>('submit');
    expect(button.disabled).toBe(true);
  });

  it('calls JobsStore.add after the form is filled and submitted', async () => {
    setInputValue('company', 'Example');
    setInputValue('position', 'Frontend developer');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = getElement<HTMLButtonElement>('submit');
    expect(button.disabled).toBe(false);
    button.click();
    await fixture.whenStable();

    expect(addJob).toHaveBeenCalledOnce();
    expect(addJob).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Example',
        position: 'Frontend developer',
        status: 'applied',
      }),
    );
    fixture.detectChanges();
    expect(getElement<HTMLInputElement>('company').value).toBe('');
  });

  function getElement<T extends HTMLElement>(testId: string): T {
    const element = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
    if (!element) {
      throw new Error(`Missing element with data-testid="${testId}"`);
    }
    return element as T;
  }

  function setInputValue(testId: string, value: string): void {
    const input = getElement<HTMLInputElement>(testId);
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
