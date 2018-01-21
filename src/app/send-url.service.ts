import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Company} from './Model/Company';
import {Observable} from 'rxjs/Observable';
import {Filter} from './Model/Filter';

@Injectable()
export class SendUrlService {
  private subject = new Subject<any>();
  url = new EventEmitter<string>();

  sendUrl(url: string) {
    this.subject.next(url);
    this.url.emit(url);
  }

  getUrl(): Observable<any> {
    return this.subject.asObservable();
  }

  getUrlParameters(filter: Filter) {
    let urlParameters = '';
    const filterKeys = Object.keys(filter);

    for (let i = 0; i < filterKeys.length; i++) {
      urlParameters = urlParameters + filterKeys[i] + ':' + filter[filterKeys[i]] + ';';
    }
    return urlParameters;
  }
}
