import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCountryPage } from './manage-country';

@NgModule({
  declarations: [
    ManageCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageCountryPage),
  ],
})
export class ManageCountryPageModule {}
