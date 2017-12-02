import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  line: Array<any>;
  title = "Blogs for Everybody!";
  constructor(private _dataService: DataService){
	//this._dataService.getLine()
		//.subscribe(res => this.line = res);
  }
  ngOnInit(){
	this._dataService.testFunction();
  }
}
