import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
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

  constructor(private _placeService: PlacesService, private _router: Router, private _loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.placesSub = this._placeService.places.subscribe(p => {
      this.offers = p;
    });
  }

  ionViewWillEnter() {

    this._loadingCtrl.create({
      message: 'Loading places...'
    }).then(l => {
      l.present();
      this._placeService.fetchPlaces().subscribe(args => {
        this.offers = args;
        l.dismiss();
      });
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
