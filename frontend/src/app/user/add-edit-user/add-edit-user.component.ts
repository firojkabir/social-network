import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent {
  id = '';
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userService: UserService
  ) {
    this.id = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.id) {
      this.userService.getUser(this.id).subscribe({
        next: (user: User) => {
          this.userForm.patchValue(user);
        },
      });
    }
  }

  onSubmit = () => {
    if (!this.userForm.valid) {
      return;
    }

    if (this.id) {
      this.userService.updateUser(this.id, this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['users']);
        },
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['users']);
        },
      });
    }
  };
}
