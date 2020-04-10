import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { take, delay, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class BookingsService {

    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    constructor(private _authService: AuthService) { }

    addBooking(placeId: string, placeTitle: string, placeImage: string, firstName: string, lastName: string, guestNumber: number, dateFrom: string | Date, dateTo: string | Date) {
        const newBooking = new Booking(Math.random().toString(), placeId, this._authService.userId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo);

        return this.bookings.pipe(take(1), delay(1000), tap(b => {
            this._bookings.next(b.concat(newBooking))
        }));
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(take(1), delay(1000), tap(b => {
            this._bookings.next(b.filter(bf => bf.id !== bookingId))
        }));
    }

}