import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.route.snapshot.queryParams;
    let p = new URLSearchParams();
    for (let key in params) {
      p.set(key, params[key])
    }

    this.authService.verifyEmail(p).subscribe((res) => {
      console.log(res);
    })

  }

}
