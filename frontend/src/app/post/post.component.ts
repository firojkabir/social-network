import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Post } from './models/post.model';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  posts: Post[] = [];
  id = '';
  isLoggedIn = false;

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute
  ) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      },
    });
  }

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      },
    });
  }

  navigateToAddPost = () => {
    this.router.navigate(['posts/add']);
  };

  navigateToEditPost = (id: string) => {
    this.router.navigate([`posts/${id}/edit`]);
  };

  deletePostById = (id: string) => {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post._id != id);
      },
    });
  };

  navigateToPostDetails = (id: string) => {
    this.router.navigate([`posts/${id}/details`]);
  };
}
