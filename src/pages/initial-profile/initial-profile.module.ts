import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialProfilePage } from './initial-profile';

@NgModule({
  declarations: [
    InitialProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(InitialProfilePage),
  ],
})
export class InitialProfilePageModule {}
