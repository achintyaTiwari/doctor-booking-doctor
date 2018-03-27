import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageHospitalPage } from './manage-hospital';

@NgModule({
  declarations: [
    ManageHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageHospitalPage),
  ],
})
export class ManageHospitalPageModule {}
