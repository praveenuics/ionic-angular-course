import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;
  public isLoading = false;

  constructor(private _placesService: PlacesService, private _authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this._placesService.places.subscribe(p => {
      this.loadedPlaces = p;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
      this.relevantPlaces = this.loadedPlaces;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this._placesService.fetchPlaces().subscribe(args => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onFilterUpdate(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(p => p.userId !== this._authService.userId);
    }
    this.listedLoadedPlaces = this.relevantPlaces.slice(1)
    console.log(event.detail);
  }

}
