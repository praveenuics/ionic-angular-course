import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

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
