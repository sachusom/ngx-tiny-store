import { Injectable } from '@angular/core';
import { DataStoreBase } from 'projects/ngx-tiny-store/src/lib/data-store.base';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataStoreBase {

  constructor() {
    super();
  }

  /* Public Shared Values */
  users = this.manageStoreValue<User[]>('user', new BehaviorSubject<User[]>([]));

  addUser(user: User): void {
    let users = this.users.get();
    if (users) {
      users.push(user);
    } else {
      users = [user];
    }
    this.users.set(users);
  }
}

