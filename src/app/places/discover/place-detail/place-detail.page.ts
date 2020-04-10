import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingsService } from '../../../bookings/bookings.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  isBookable = false;
  private placesSub: Subscription;

  constructor(private _authService: AuthService, private _loadingCtlr: LoadingController, private _bookingService: BookingsService, private _modalCtrl: ModalController, private _actionSheetCtrl: ActionSheetController, private _navCtrl: NavController, private _activatedRoute: ActivatedRoute, private _placeService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtrl.navigateBack('/places/tabs/discover');
      }

      this.placesSub = this._placeService.getPlace(p.get('placeId')).subscribe(p => {
        this.place = p;
        this.isBookable = p.userId !== this._authService.userId;
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onBookPlace() {

    this._actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]

    }).then(l => {
      l.present();
    });;
  }

  openBookingModal(mode: 'select' | 'random') {
    this._modalCtrl.create({ component: CreateBookingComponent, componentProps: { selectedPlace: this.place, selectedMode: mode } }).then(el => {
      el.present();
      return el.onDidDismiss()
    }).then(rdata => {
      if (rdata.role === 'confirm') {
        this._loadingCtlr.create({
          message: 'Booking Place...'
        }).then(l => {
          l.present();
          const data = rdata.data.bookingData;
          this._bookingService.addBooking(this.place.id, this.place.title, this.place.imageUrl, data.firstName, data.lastName, data.guestNumber, data.startDate, data.endDate).subscribe(p => {
            l.dismiss();
          });
        });
      }
    })
  }
}
