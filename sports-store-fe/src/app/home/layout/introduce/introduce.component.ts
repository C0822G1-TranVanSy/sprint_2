import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Giới thiệu');
  }

  ngOnInit(): void {
    window.scrollTo(0, 10);
  }

}
