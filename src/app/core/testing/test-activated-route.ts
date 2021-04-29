import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private paramMapSubject = new ReplaySubject<ParamMap>();
  private queryParamsSubject = new ReplaySubject<Params>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
    this.setQueryParams(initialParams);
  }

  readonly paramMap = this.paramMapSubject.asObservable();
  readonly queryParams = this.queryParamsSubject.asObservable();

  setParamMap(params?: Params) {
    this.paramMapSubject.next(convertToParamMap(params));
  }

  setQueryParams(params?: Params) {
    this.queryParamsSubject.next(params);
  }
}
