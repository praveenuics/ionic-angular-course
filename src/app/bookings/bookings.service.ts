import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { take, delay, tap, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    public baseUrl = 'https://ionic-angular-course-8a994.firebaseio.com/';

    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    constructor(private _authService: AuthService, private _http: HttpClient) { }

    addBooking(placeId: string, placeTitle: string, placeImage: string, firstName: string, lastName: string, guestNumber: number, dateFrom: string | Date, dateTo: string | Date) {
        let genId: string;
        const newBooking = new Booking(Math.random().toString(), placeId, this._authService.userId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo);

        return this._http.post<{ name: string }>(`${this.baseUrl}`, { ...newBooking, id: null }).pipe(switchMap(resp => {
            genId = resp.name;
            return this.bookings;
        }), take(1), tap(b => {
            newBooking.id = genId;
            this._bookings.next(b.concat(newBooking))
        }));
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(take(1), delay(1000), tap(b => {
            this._bookings.next(b.filter(bf => bf.id !== bookingId))
        }));
    }

}