import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];

  constructor(private _bookingService: BookingsService) { }

  ngOnInit() {
    this.loadedBookings = this._bookingService.bookings;
  }

  onCancelBooking(id:string, slidingItem: IonItemSliding){
    slidingItem.close();
  }

}
