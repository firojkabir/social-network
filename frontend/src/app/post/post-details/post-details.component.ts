import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

enum SocketEvent {
  CommentAdded = 'commentAdded',
}

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent {
  postId = '';
  posts: Post[] = [];
  post: any = [];

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private socket: Socket
  ) {
    this.postService.newComment.subscribe({
      next: (data: any) => {
        if (data.postId == this.postId) {
          this.post.comments = [...this.post.comments, data.comment];
        }
      },
    });

    this.socket.on(SocketEvent.CommentAdded, (data: any) => {
      //   console.log(SocketEvent.CommentAdded, data);

      this.postService.newComment.next(data);
    });
  }

  ngOnInit() {
    this.postId = this.activatedRouter.snapshot.params['id'];

    if (this.postId) {
      this.postService.getPost(this.postId).subscribe({
        next: (post: Post) => {
          this.post = post;
        },
      });
    }
  }

  onSubmit = (id: string) => {
    if (!this.commentForm.valid) {
      return;
    }

    const formValue = this.commentForm.value;
    this.postService.addComment(id, formValue).subscribe();
    this.commentForm.reset();
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

  deleteComment = (id: string) => {
    alert(this.postId + id);
  };
}
