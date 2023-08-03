import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [PostComponent, AddEditPostComponent, PostDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, PostRoutingModule],
})
export class PostModule {}
