import {Component, OnInit, HostBinding} from '@angular/core';
import {SendUrlService} from '../send-url.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FadeInAnimation} from '../animations';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  subscription: Subscription;
  mapUrl: SafeResourceUrl;

  constructor(private sendUrlService: SendUrlService, private sanitizer: DomSanitizer) {
    this.subscription = this.sendUrlService.getUrl().subscribe(data => {
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://data.opendatasoft.com/explore/embed/dataset/base-sirene@datanova/map/?q=' + data);
    });
  }

  ngOnInit() {
  }

}
