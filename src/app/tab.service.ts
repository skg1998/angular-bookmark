import { Injectable } from '@angular/core';
import { ITab } from './tab.model';

@Injectable()
export class TabService {
  tabs: ITab[] = [];
  tabOptions: ITab[] = [{ name: 'Movies', url: '/movies' }, { name: 'Songs',   url: '/songs' }];
  constructor() { }

  addTab(url: string) {
  const tab = this.getTabOptionByUrl(url);
  this.tabs.push(tab);
}
 
getTabOptionByUrl(url: string): ITab {
  return this.tabOptions.find(tab =&gt; tab.url === url);
}
 
deleteTab(index: number) {
  this.tabs.splice(index, 1);
}

}