import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss'],
})
export class AddEditPostComponent {
  id = '';
  postForm = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.id) {
      this.postService.getPost(this.id).subscribe({
        next: (post: Post) => {
          this.postForm.patchValue(post);
        },
      });
    }
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    if (this.id) {
      this.postService.updatePost(this.id, this.postForm.value).subscribe({
        next: () => {
          this.router.navigate(['posts']);
        },
      });
    } else {
      this.postService.createPost(this.postForm.value).subscribe({
        next: () => {
          this.router.navigate(['posts']);
        },
      });
    }
  }
}
