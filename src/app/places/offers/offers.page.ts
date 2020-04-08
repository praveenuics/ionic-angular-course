import { Component, OnInit } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public offers: Place[] = [];

  constructor(private _placeService: PlacesService) { }

  ngOnInit() {
    this.offers = this._placeService.places;
  }

}
