import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentsConstants } from 'constants/index';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/core/models/store.interface';
import { Store } from '@ngrx/store';
import { BusinessActions } from 'src/app/core/store/business';

@Component({
  selector: 'app-delete-business',
  templateUrl: './delete-business.component.html',
  styleUrls: ['./delete-business.component.scss']
})
export class DeleteBusinessComponent implements OnInit {
  @Input() businessId: string;
  readonly passwordsTypes = ComponentsConstants.TypePasswords;
  password = new FormControl('', [Validators.required]);
  deleted = false;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  deleteBusiness() {
    this.store.dispatch(BusinessActions.deleteBusiness.request({ businessId: this.businessId, password: this.password.value }));
  }
}
