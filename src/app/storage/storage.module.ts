import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageSenderComponent} from './storage-sender/storage-sender.component';
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule
  ],
  declarations: [StorageSenderComponent],
  exports: [StorageSenderComponent]
})
export class StorageModule {
}
