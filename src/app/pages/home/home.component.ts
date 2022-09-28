import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  video!: string;

  constructor() { }

  ngOnInit(): void {
    this.video = '/assets/img/blackjackIntro.mp4'
  }
}
