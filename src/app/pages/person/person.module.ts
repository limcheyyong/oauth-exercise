import { SharedMaterialModule } from './../../shared/shared-material/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule, PersonRoutingModule, SharedMaterialModule],
})
export class PersonModule {}
