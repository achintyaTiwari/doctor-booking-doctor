import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageDoctorPage } from './manage-doctor';

@NgModule({
  declarations: [
    ManageDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageDoctorPage),
  ],
})
export class ManageDoctorPageModule {}
