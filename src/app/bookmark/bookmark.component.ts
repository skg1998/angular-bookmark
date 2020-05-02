import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  public simpleList = [
    [
      { 'name': 'John' },
      { 'name': 'Smith' },
      { 'name': 'George' },
    ],
    [
      { 'name': 'Jennifer' },
      { 'name': 'Laura' },
      { 'name': 'Georgina' },
    ]
  ];

  

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
  
  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
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

}