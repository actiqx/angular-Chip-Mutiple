import {Component} from '@angular/core';
import {PageEvent} from '@angular/material';

/**
 * @title Configurable paginator
 */
@Component({
  selector: 'paginator-configurable-example',
  templateUrl: 'paginator-configurable-example.html',
  styleUrls: ['paginator-configurable-example.css'],
})

export class PaginatorConfigurableExample {

  // MatPaginator Inputs
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
selectedChips=[];
  // MatPaginator Output
  pageEvent: PageEvent;

  datasource = [];

  activePageDataChunk = []

  constructor() {
    // Generaing dummy content
    for (let i = 0; i < 1000; i++) {
      let dummyObject = { field: `abc${i+1}`,state:false} 
      this.datasource.push(dummyObject);
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
  changeSelected( query) {

let index = this.selectedChips.indexOf(query);
if (index >= 0) {
    this.selectedChips.splice(index, 1);
} else {
  query.state=!query.state;
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