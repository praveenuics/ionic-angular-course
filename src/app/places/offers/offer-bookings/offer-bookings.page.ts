import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place: Place;

  constructor(private _activatedRoute: ActivatedRoute, private _navCtlr: NavController, private _placeService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtlr.navigateBack('/places/tabs/offers');
      } else {
        this.place = this._placeService.getPlace(p.get('placeId'));
      }
    });
  }

}
