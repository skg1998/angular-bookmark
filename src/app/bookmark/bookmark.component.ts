import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  public allData = [
    [
      { 'name': 'youtube' },
      { 'url': 'www.youtube.com' },
      { 'date': 'George' },
    ],
    [
      { 'name': 'Gmail' },
      { 'url': 'www.gmail.com' },
      { 'date': 'Georgina' },
    ]
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allData, event.previousIndex, event.currentIndex);
  }

  

  ngOnInit() {
  }

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;
 
  constructor(
    private modalService: NgbModal
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  // dialog start ************************************
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    };

  }

  //dialog end ***********************************


  //create Or add-bookmark 
  addBookmark(){

  }


  //remove bookmark
  onDelete(id: any) {

    }

  //edit bookmark
  onEdit(){

  } 

  //favorite Bookmark  
  onFavourite(){
    
  }
}