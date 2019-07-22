import {Component,OnInit,HostListener,Input,ViewChild} from '@angular/core';
import {PageEvent,MatPaginator} from '@angular/material';

/**
 * @title Configurable paginator
 */
@Component({
  selector: 'paginator-configurable-example',
  templateUrl: 'paginator-configurable-example.html',
  styleUrls: ['paginator-configurable-example.css'],
})

export class PaginatorConfigurableExample implements OnInit{

  // MatPaginator Inputs
  length = 100;
  pageSize = 0;
  chipWidth=168;
  @Input() row=2;
  paginatorArray=[];
  pageSizeOptions: number[] = [5, 10, 25, 100];
selectedChips=[];
currentPageIndex:any;
windowWidth:any;
@ViewChild('paginator') paginator: MatPaginator; 
  // MatPaginator Output
  pageEvent: PageEvent;

  datasource = [];

  activePageDataChunk = []

  constructor() {
    // Generaing dummy content
    for (let i = 0; i < this.length; i++) {
      let dummyObject = { field: `abc${i+1}`,state:false} 
      this.datasource.push(dummyObject);
    }
   
  }
  ngOnInit(){
    this.windowWidth= window.innerWidth-50;
    this.getPagination();
    this.currentPageIndex=1;
    
  }
@HostListener('window:resize', ['$event'])
onResize(event) {
  this.windowWidth = window.innerWidth-50;
  console.log(this.windowWidth);
  this.getPagination();
}
  getPagination(){
    this.pageSize=Math.floor(Math.floor(this.windowWidth/this.chipWidth) * this.row);
  
    let pagination=this.length/this.pageSize;
    this.paginatorArray=[];
    for(var i=1;i<pagination;i++){
      this.paginatorArray.push(i);
    }
     this.activePageDataChunk = this.datasource.slice(0,this.pageSize);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
  }
  
setCurrent(num) {
// const firstCut = (num - 1) * this.paginator.pageSize;//0*3/
// const secondCut = firstCut + this.paginator.pageSize;//0+3
const firstCut = (num - 1) * this.pageSize;
const secondCut = firstCut + this.pageSize;
this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
this.currentPageIndex = num;
}
 
  setPreviousPage(event) {
    event.preventDefault();
    if (this.currentPageIndex>1) {
    this.currentPageIndex--;
    this.paginator.previousPage();
    }
}

  setNextPage(event) {
    event.preventDefault();

      debugger;
    if (this.currentPageIndex<this.paginatorArray.length) {
    this.currentPageIndex++;
    this.paginator.nextPage();
    }
}
  changeSelected( query) {

let index = this.selectedChips.indexOf(query);
if (index >= 0) {
    this.selectedChips.splice(index, 1);
} else {
  
    this.selectedChips.push(query);
}
console.log("this. selectedChips " + JSON.stringify(this.selectedChips)  );

}
selectAllRecord(){
  this.datasource.map(chip=>{
    return chip.state=true;
  })
  this.selectedChips.push(this.datasource)
}
clearAllRecord(){
  this.datasource.map(chip=>{
    return chip.state=false;
  })
  this.selectedChips=[];
}
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */