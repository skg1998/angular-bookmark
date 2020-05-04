import { ModuleWithProviders ,NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule,} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DndListModule } from 'ngx-drag-and-drop-lists';

import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ,NgbModule ,Ng2SearchPipeModule,DndListModule ,ReactiveFormsModule,MatTabsModule,
  BrowserAnimationsModule,
  MatButtonModule ,
  MatButtonToggleModule,
  DragDropModule
  ],
  declarations: [ AppComponent, BookmarkComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class AppModule {
    constructor(public matIconRegistry: MatIconRegistry) {
        // matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialModule,
            providers: [MatIconRegistry]
        }
    }
 }
