import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  loadedBookings: Booking[];
  bookinSub: Subscription;

  constructor(private _bookingService: BookingsService, private _loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookinSub = this._bookingService.bookings.subscribe(b => {
      this.loadedBookings = b;
    });
  }

  ngOnDestroy() {
    if (this.bookinSub) {
      this.bookinSub.unsubscribe();
    }
  }

  onCancelBooking(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this._loadingCtrl.create({
      message: 'Cancelling...'
    }).then(l => {
      l.present();
      this._bookingService.cancelBooking(id).subscribe(args => {
        l.dismiss();
      });
    });
  }

}
