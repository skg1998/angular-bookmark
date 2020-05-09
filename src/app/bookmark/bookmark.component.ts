import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input() selectedFolder:string;
  @ViewChild('mymodal') mymodalRef: ElementRef;

  bookmarkTabStore:any = [];
  closeResult: string;
  modalOptions:NgbModalOptions;

  order: string = '';
  reverse: boolean = false;
  
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
    this.getPicPreview('https://www.npmjs.com/');
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
            bookmark.modifiedDate = new Date();
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

  //unfurl 
  getPicPreview(url){
    fetch('https://unfurl.io/api/preview?api_token=BUyGop2jrf75qT1f64Arau9dDXxDv6NCeACXSKQRpeVvjEe4Hw78oUdZFWkR&url='+url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      method: 'get',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  }
  
  //sorting by label, created-date , update-date
  sortBy(named){
    this.order = named;
    this.bookmarks = this.bookmarks.sort((a,b)=>{
      console.log(named);
      console.log(this.reverse);
      if(named=="created") return (this.reverse ? 1 : -1)*((a.createdDate - b.createdDate));
      if(named=="modified") return (this.reverse ? 1 : -1)*(a.modifiedDate - b.modifiedDate);
      if(named=="label") return (this.reverse ? 1 : -1)*( a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    })
    this.reverse = !this.reverse;
    return false;
  }

}