import { Component, EventEmitter,  Input, OnChanges, OnInit, Output , DoCheck,AfterContentInit, ContentChild, ElementRef,AfterContentChecked,AfterViewInit, ViewChild,AfterViewChecked,OnDestroy} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class Child implements OnChanges,OnInit,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
// @Input() productName!: string;
// @Output() productClicked = new EventEmitter<string>();
// sendData(){
//   this.productClicked.emit("Data from child")
// }
@Input() message:string = 'Input from child';
constructor(){
  console.log('Root Component');
  console.log('Constructor',this.message);
}

ngOnChanges(){
console.log("On Changes", this.message);
}    
ngOnInit(){
  console.log('On Init',this.message);
}
@ContentChild('projectedParagraph') projectedParagraph !: ElementRef;
ngDoCheck(){
console.log('Do Check',this.message);
console.log('Do Check',this.projectedParagraph);
}


ngAfterContentInit(){
console.log('After Content Init', this.projectedParagraph.nativeElement);

}
ngAfterContentChecked(){
console.log('After Content Checked', this.projectedParagraph);
}

@ViewChild('paragraph') paragraph !:ElementRef;
ngAfterViewInit(){
console.log('After View Init',this.paragraph);
}
ngAfterViewChecked(){
console.log('After View Checked',this.paragraph);
}
ngOnDestroy(){
console.log('Destroy');
}
}
