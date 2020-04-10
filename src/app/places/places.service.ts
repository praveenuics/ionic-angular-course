import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.', 'https://arizent.brightspotcdn.com/3e/31/e01970964e9f8c063c6ff0d7afe7/new-york-070219-bl.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place('p2', 'La Amour Toujours', 'In the heart of New York City.', 'https://q-cf.bstatic.com/images/hotel/max1024x768/514/51410533.jpg', 189.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
    new Place('p3', 'The Foggey Palace', 'Castle with good scenary.', 'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg', 249.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private _authService: AuthService) { }

  addPlace(title: string, desc: string, price: number, from: string | Date, to: string | Date) {
    const newPlace = new Place(Math.random().toString(), title, desc, 'https://arizent.brightspotcdn.com/3e/31/e01970964e9f8c063c6ff0d7afe7/new-york-070219-bl.jpg', price, from, to, this._authService.userId);

    return this.places.pipe(take(1), delay(1000), tap(p => {
      this._places.next(p.concat(newPlace));
    }));
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(p => {
      return { ...p.find(p => p.id === id) };
    }));
  }

  updateOffer(id: string, title: string, desc: string) {
    return this.places.pipe(take(1), delay(1000), tap(p => {
      const updatedPlace = p.findIndex(pl => pl.id === id);
      const updatedPlaces = [...p];
      const olPlace = updatedPlaces[updatedPlace];
      updatedPlaces[updatedPlace] = new Place(olPlace.id, title, desc, olPlace.imageUrl, olPlace.price, olPlace.availableFrom, olPlace.availableTo, olPlace.userId);
      this._places.next(updatedPlaces)
    }));
  }
}
