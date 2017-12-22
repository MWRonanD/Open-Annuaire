import {Component, OnInit} from '@angular/core';
import {SendUrlService} from '../send-url.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
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
