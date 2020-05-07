import { Component ,Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  
  tabs;
  selected = new FormControl(0);

  constructor(private store: StorageMap){
    let $this = this;
    this.store.get("bookmarkFolders").subscribe(function(bookmarkFolders){
      bookmarkFolders = bookmarkFolders || [];
      $this.tabs = bookmarkFolders;
    });
  }

  addTab(selectAfterAdding: boolean) {
    let bookmarkName = prompt("Enter Folder Name");
    if(bookmarkName){
      if( this.tabs.map(tab => tab.toLowerCase()).includes( bookmarkName.toLowerCase() ) ) return;
      this.tabs.push(bookmarkName);
      this.store.set("bookmarkFolders", this.tabs).subscribe(()=>{});
      if (selectAfterAdding) {
        this.selected.setValue(this.tabs.length - 1);
      }
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.store.set("bookmarkFolders", this.tabs).subscribe(()=>{});
  }
}