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
      console.log(i);
      console.log(filter[filterKeys[i]].filter);
      if (filter[filterKeys[i]].filter === undefined) {
        filterKeys.splice(i, 1);
      }
    }
    console.log(filterKeys);
    for (let i = 0; i < filterKeys.length; i++) {
      console.log(filter[filterKeys[i]]);
      if (filter[filterKeys[i]].filter !== undefined) {
        if (filter[filterKeys[i]].filter.length > 1) {
          for (let j = 0; j < filter[filterKeys[i]].filter.length; j++) {
            if (j === 0) {
              urlParameters = urlParameters + ' (';
            }
            urlParameters = urlParameters + filterKeys[i] + ':' + filter[filterKeys[i]].filter[j].data;
            if (j !== filter[filterKeys[i]].filter.length - 1) {
              urlParameters = urlParameters + ' OR ';
            } else {
              urlParameters = urlParameters + ') ';
            }
          }
        } else {
          if (filter[filterKeys[i]].filter[0].dateBefore !== undefined) {
            const afterBefore = filter[filterKeys[i]].filter[0].dateBefore ? '<' : '>';
            urlParameters = urlParameters + filterKeys[i] + afterBefore + filter[filterKeys[i]].filter[0].data;
          } else {
            urlParameters = urlParameters + filterKeys[i] + ':' + filter[filterKeys[i]].filter[0].data;
          }
          if (i !== filterKeys.length - 1) {
            urlParameters = urlParameters + ' AND ';
          }
        }
      }
    }
    console.log(urlParameters);
    return urlParameters;
  }
}
