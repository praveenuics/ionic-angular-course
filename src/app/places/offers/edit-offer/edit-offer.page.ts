import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;
  form: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute, private _navCtlr: NavController, private _placeService: PlacesService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(p => {
      if (!p.has('placeId')) {
        this._navCtlr.navigateBack('/places/tabs/offers');
      }
      this.place = this._placeService.getPlace(p.get('placeId'));
      this.form = new FormGroup({
        title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required] }),
        description: new FormControl(this.place.description, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)] })
      });
    });
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);

  }

}
