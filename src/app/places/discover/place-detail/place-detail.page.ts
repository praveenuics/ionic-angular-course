import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private _modalCtrl: ModalController, private _actionSheetCtrl: ActionSheetController, private _navCtrl: NavController, private _activatedRoute: ActivatedRoute, private _placeService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtrl.navigateBack('/places/tabs/discover');
      } else {
        this.place = this._placeService.getPlace(p.get('placeId'));
      }
    });
  }

  onBookPlace() {
    // this._router.navigate(['/places/tabs/discover']);
    // this._navCtrl.navigateBack('/places/tabs/discover');

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
    console.log(mode);
    this._modalCtrl.create({ component: CreateBookingComponent, componentProps: { selectedPlace: this.place, selectedMode: mode } }).then(el => {
      el.present();
      return el.onDidDismiss()
    }).then(data => {
      console.log(data.data, data.role);
      if (data.data === 'confirm') {
        console.log('Booked!');
      }
    })
  }

}
