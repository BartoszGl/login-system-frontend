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

  ngOnInit(): void {
    this.adminCmsService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.drawTable = true;
    });
  }

}
