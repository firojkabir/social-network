import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
    });
  }

  navigateToEditUser = (id: string) => {
    this.router.navigate([`users/${id}/edit`]);
  };

  deleteUserById = (id: string) => {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user._id != id);
      },
    });
    this.authService.logout();
    this.router.navigate(['login']);
  };

  navigateToAddPost = () => {
    this.router.navigate(['posts/add']);
  };
}
