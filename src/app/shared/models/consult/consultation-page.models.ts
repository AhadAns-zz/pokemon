export interface IConsultationPage<T> {
  results: T[] | null;
  next: string;
  previous: string;
  count: number;
  offset: number;
  limit: number;
}

export class ConsultationPage<T> implements IConsultationPage<T> {
  public static create<T>(consultationPage: {
    results: T[];
    next: string;
    previous: string;
    count: number;
    offset: number;
    limit: number;
  }): IConsultationPage<T> {
    return new ConsultationPage<T>(
      consultationPage.results,
      consultationPage.next,
      consultationPage.previous,
      consultationPage.count,
      consultationPage.offset,
      consultationPage.limit
    );
  }

  public constructor(
    public results: T[],
    public next: string,
    public previous: string,
    public count: number,
    public offset: number,
    public limit: number
  ) {}
}
