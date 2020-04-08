import { Component, OnInit } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public offers: Place[] = [];

  constructor(private _placeService: PlacesService, private _router: Router) { }

  ngOnInit() {
    this.offers = this._placeService.places;
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
    console.log('Editing item', id);
  }
}
