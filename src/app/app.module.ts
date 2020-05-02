import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DndListModule } from 'ngx-drag-and-drop-lists';

import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { TabService } from './tab.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,NgbModule ,Ng2SearchPipeModule,DndListModule ,],
  declarations: [ AppComponent, BookmarkComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TabService]
})
export class AppModule {
  
 }
