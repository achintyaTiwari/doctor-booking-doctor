import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCityPage } from './manage-city';

@NgModule({
  declarations: [
    ManageCityPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageCityPage),
  ],
})
export class ManageCityPageModule {}
