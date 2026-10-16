export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  appliedAt: string;      // дата у форматі ISO: '2026-10-01'
  salary?: number;        // необов'язкове поле, $ на місяць
  url?: string;           // посилання на вакансію
  notes?: string;
}