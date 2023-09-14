import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDepPageRoutingModule } from './show-dep-routing.module';

import { ShowDepPage } from './show-dep.page';
import {MatIconModule} from '@angular/material/icon';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDepPageRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [ShowDepPage,DynamicTableComponent]
})
export class ShowDepPageModule {}
