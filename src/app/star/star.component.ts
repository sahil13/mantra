import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating: number;

  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  totalWidth: number;

  constructor() {}
  ngOnInit(): void {}

  showRating() {
    this.ratingClicked.emit(`rating id ${this.rating}`);
  }

  ngOnChanges() {
    this.totalWidth = (this.rating * 75) / 5;
  }
}
