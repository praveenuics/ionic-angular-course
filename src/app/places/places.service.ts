import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlacesPageModule } from './places.module';

interface PlaceData {
  availableFrom: string | Date;
  availableTo: string | Date;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

// [
//   new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.', 'https://arizent.brightspotcdn.com/3e/31/e01970964e9f8c063c6ff0d7afe7/new-york-070219-bl.jpg', 149.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
//   new Place('p2', 'La Amour Toujours', 'In the heart of New York City.', 'https://q-cf.bstatic.com/images/hotel/max1024x768/514/51410533.jpg', 189.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
//   new Place('p3', 'The Foggey Palace', 'Castle with good scenary.', 'https://i.pinimg.com/originals/9c/88/44/9c8844b217bdb6c17db14f51ad2e51a5.jpg', 249.99, new Date('2019-01-01'), new Date('2019-12-31'), 'abc'),
// ]

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  public baseUrl = 'https://ionic-angular-course-8a994.firebaseio.com/';

  constructor(private _authService: AuthService, private _http: HttpClient) { }

  fetchPlaces() {
    return this._http.get<{ [key: string]: PlaceData }>(this.baseUrl + 'offered-places.json').pipe(map(resp => {
      const places = [];
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          places.push(new Place(key, resp[key].title, resp[key].description, resp[key].imageUrl, resp[key].price, new Date(resp[key].availableFrom), new Date(resp[key].availableTo), resp[key].userId));
        }
      }
      return places;
    }),
      tap(places => {
        this._places.next(places);
      }));
  }

  addPlace(title: string, desc: string, price: number, from: string | Date, to: string | Date) {
    let genId;
    const newPlace = new Place(Math.random().toString(), title, desc, 'https://arizent.brightspotcdn.com/3e/31/e01970964e9f8c063c6ff0d7afe7/new-york-070219-bl.jpg', price, from, to, this._authService.userId);

    return this._http.post<{ name: string }>(this.baseUrl + 'offered-places.json', { ...newPlace, id: null }).pipe(
      switchMap(resData => {
        genId = resData.name;
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = genId;
        this._places.next(places.concat(newPlace));
      })
    );
    // return this.places.pipe(take(1), delay(1000), tap(p => {
    //   this._places.next(p.concat(newPlace));
    // }));
  }

  getPlace(id: string) {
    return this._http.get<PlaceData>(`${this.baseUrl}offered-places/${id}.json`).pipe(map(rData => {
      return new Place(id, rData.title, rData.description, rData.imageUrl, rData.price, rData.availableFrom, rData.availableTo, rData.userId);
    }));
  }

  updateOffer(id: string, title: string, desc: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(take(1), switchMap(p => {

      if (!p || p.length <= 0) {
        return this.fetchPlaces();
      } else {
        return of(p);
      }

    }), switchMap(pl => {
      const updatedPlace = pl.findIndex(pl => pl.id === id);
      const updatedPlaces = [...pl];
      const olPlace = updatedPlaces[updatedPlace];
      updatedPlaces[updatedPlace] = new Place(olPlace.id, title, desc, olPlace.imageUrl, olPlace.price, olPlace.availableFrom, olPlace.availableTo, olPlace.userId);

      return this._http.put(`${this.baseUrl}offered-places/${id}.json`, { ...updatedPlaces[updatedPlace], id: null })
    }), tap(() => {
      this._places.next(updatedPlaces)
    }))
  }
}
