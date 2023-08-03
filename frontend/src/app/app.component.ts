import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from './post/services/post.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;
  activities: { postId: string; comment: string }[] = [];
  subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      },
    });

    this.postService.newComment.subscribe({
      next: (data: any) => {
        this.activities = [
          ...this.activities,
          data,
          //   `New comment added - ${data.postId} - ${data.comment}`,
        ];
      },
    });
  }

  ngOnInit() {}

  makeApiCall = () => {
    this.subscription = this.postService.getPosts().subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  };

  cancelApiCall = () => {
    this.subscription.unsubscribe();
  };
}
