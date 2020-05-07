import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input() selectedFolder:string;
  @ViewChild('mymodal') mymodalRef: ElementRef;

  bookmarkTabStore:any = [];
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
  
  bookmarkForm = {
    bookmarkId: null,
    label: "",
    url: ""
  }

  public bookmarks: any = [];

  constructor(
    private modalService: NgbModal,
    private store: StorageMap
  ){

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
    let $this = this;
    this.bookmarkTabStore = "bookmarkManager###"+this.selectedFolder;
    this.store.get( this.bookmarkTabStore ).subscribe(storeBookmarks=>{
      if(storeBookmarks){
        $this.bookmarks = storeBookmarks;
      }else{
        this.store.set(this.bookmarkTabStore, []).subscribe(()=>{});
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.bookmarks, event.previousIndex, event.currentIndex);
    this.store.set(this.bookmarkTabStore, this.bookmarks ).subscribe(()=>{});
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (error)=> {
      this.bookmarkForm = {
        bookmarkId: null,
        label: "",
        url: ""
      }
    });
  }

  //create Or add-bookmark 
  saveBookmark(modalRef){

    if(modalRef) modalRef.close();
    if(this.bookmarkForm.label && this.bookmarkForm.url){

      if(this.bookmarkForm.bookmarkId){

        this.bookmarks = this.bookmarks.map(bookmark=> {
          if(bookmark.bookmarkId == this.bookmarkForm.bookmarkId){
            bookmark.name = this.bookmarkForm.label;
            bookmark.url = this.bookmarkForm.url;
          }
          return bookmark;
        })

      }else{
        this.bookmarks.push({
          bookmarkId: Date.now(),
          name: this.bookmarkForm.label,
          url: this.bookmarkForm.url,
          createdDate: new Date(),
          modifiedDate: new Date(),
          sortPosition: 0,
          isFavourite: false
        });
        
      }
      this.store.set(this.bookmarkTabStore, this.bookmarks ).subscribe(()=>{});
      
    }

    this.bookmarkForm = {
      bookmarkId: null,
      label: "",
      url: ""
    }
  }

  //remove bookmark
  onDelete(bookmark) {
    this.bookmarks = this.bookmarks.filter(data => data.bookmarkId != bookmark.bookmarkId);
    this.store.set(this.bookmarkTabStore, this.bookmarks ).subscribe(()=>{});
  }

  //edit bookmark
  onEdit(bookmark){
    this.bookmarkForm = {
      bookmarkId: bookmark.bookmarkId,
      label: bookmark.name,
      url: bookmark.url
    }
    this.open(this.mymodalRef);
  }

  //favorite Bookmark  
  onFavourite(bookmark){
    this.bookmarks = this.bookmarks.map(data => {
      if(data.bookmarkId == bookmark.bookmarkId) data.isFavourite = !data.isFavourite;
      return data;
    });
    console.log(this.bookmarks)
    this.store.set(this.bookmarkTabStore, this.bookmarks ).subscribe(()=>{});
  }

}