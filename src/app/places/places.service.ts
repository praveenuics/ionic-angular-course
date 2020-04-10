import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.', 'https://arizent.brightspotcdn.com/3e/31/e01970964e9f8c063c6ff0d7afe7/new-york-070219-bl.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p2', 'La Amour Toujours', 'In the heart of New York City.', 'https://q-cf.bstatic.com/images/hotel/max1024x768/514/51410533.jpg', 189.99, new Date('2019-01-01'), new Date('2019-12-31')),
    new Place('p3', 'The Foggey Palace', 'Castle with good scenary.', 'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg', 249.99, new Date('2019-01-01'), new Date('2019-12-31')),
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string) {
    return { ...this.places.find(p => p.id === id) };
  }
}
