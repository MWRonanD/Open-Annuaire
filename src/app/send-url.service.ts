import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Company} from './Model/Company';
import {Observable} from 'rxjs/Observable';
import {Filter, Filters} from './Model/Filter';

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

  getUrlParameters(filter: Filters) {
    let urlParameters = '';
    const filterKeys = Object.keys(filter);
    console.log(filterKeys);
    for (let i = 0; i < filterKeys.length; i++) {
      urlParameters = urlParameters + filterKeys[i] + ':' + filter[filterKeys[i]].data;
      console.log(filter[filterKeys[i]]);
      if (i !== filterKeys.length - 1) {
        urlParameters = urlParameters + ' AND ';
      }
      }
      console.log(urlParameters);
    return urlParameters;
    }
}
