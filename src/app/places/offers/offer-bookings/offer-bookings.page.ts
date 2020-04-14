import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  placeId: string;
  place: Place;
  private placesSub: Subscription

  constructor(private _activatedRoute: ActivatedRoute, private _navCtlr: NavController, private _placeService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtlr.navigateBack('/places/tabs/offers');
      }
      this.placeId = p.get('placeId');
      this.placesSub = this._placeService.getPlace(p.get('placeId')).subscribe(p => {
        this.place = p;
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
