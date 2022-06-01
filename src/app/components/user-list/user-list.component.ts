import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.users.listener$()
      .subscribe((x: any) => {
        debugger;
        this.users = x;
      });
  }

  add(): void {
    this.userService.addUser({ firstName: '', lastName: '' });
  }

}
