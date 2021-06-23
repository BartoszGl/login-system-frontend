import { User } from './../shared/models/user';
import { AdminCmsService } from './../shared/service/admin-cms.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[]
  drawTable = false;
  constructor(private adminCmsService: AdminCmsService) { }

  // Pobieram dane dotyczące userów,
  // Nie unsubskrybuje, ponieważ robi za mnie to automatycznie async pipe
  // https://angular.io/api/common/AsyncPipe

  ngOnInit(): void {
    this.adminCmsService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.drawTable = true;
    });
  }

}
