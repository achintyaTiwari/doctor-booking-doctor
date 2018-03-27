import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataAdminPage } from './data-admin';

@NgModule({
  declarations: [
    DataAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(DataAdminPage),
  ],
})
export class DataAdminPageModule {}
