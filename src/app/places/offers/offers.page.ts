import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  public offers: Place[] = [];
  private placesSub: Subscription;

  constructor(private _placeService: PlacesService, private _router: Router) { }

  ngOnInit() {
    this.placesSub = this._placeService.places.subscribe(p => {
      this.offers = p;
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
    console.log('Editing item', id);
  }
}
