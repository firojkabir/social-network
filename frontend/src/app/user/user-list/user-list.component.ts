import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  usersList: User[] = [];
  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      },
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (usersList: User[]) => {
        this.usersList = usersList;
      },
    });
  }

  followAUser = (id: string, payload: any) => {
    this.userService.followUser(id, payload).subscribe({
      next: () => {
        const user = this.usersList.find((u) => u._id == id);
        if (user) {
          user.followers = [...user.followers, payload];
          user.followings = [...user.followings, payload];
        }
      },
    });
  };

  unfollowAUser = (id: string, payload: any) => {
    this.userService.unfollowUser(id, payload).subscribe({
      next: () => {
        const user = this.usersList.find((u) => u._id == id);
        if (user) {
          user.followers = [...user.followers, payload];
          user.followings = [...user.followings, payload];
        }
      },
    });
  };
}
