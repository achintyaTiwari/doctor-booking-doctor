import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageStatePage } from './manage-state';

@NgModule({
  declarations: [
    ManageStatePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageStatePage),
  ],
})
export class ManageStatePageModule {}
