import { SnackbarService } from './../shared/service/snackbar.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  visible = false
  message: string;

  constructor(private snBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.snBarService.onAlert()
      .subscribe((alertText: string) => {
        this.visible = true;
        this.message = alertText;
      }
      );

  }

  closeSnBar() {
    this.visible = false;
  }

}
