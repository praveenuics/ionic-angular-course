import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;
  form: FormGroup;
  private placesSub: Subscription;

  constructor(private _loadCtrl: LoadingController, private _activatedRoute: ActivatedRoute, private _navCtlr: NavController, private _placeService: PlacesService, private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtlr.navigateBack('/places/tabs/offers');
      }
      this.placesSub = this._placeService.getPlace(p.get('placeId')).subscribe(p => {
        this.place = p;
      });
      this.form = new FormGroup({
        title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required] }),
        description: new FormControl(this.place.description, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)] })
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }

    this._loadCtrl.create({
      message: 'Updating place...'
    }).then(l => {
      l.present();
      this._placeService.updateOffer(this.place.id, this.form.value.title, this.form.value.description).subscribe(p => {
        l.dismiss();
        this.form.reset();
        this._router.navigate(['/places/tabs/offers']);
      });
    });
  }
}
