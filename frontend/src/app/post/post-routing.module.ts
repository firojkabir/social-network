import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
  },
  {
    path: 'add',
    component: AddEditPostComponent,
  },
  {
    path: ':id/edit',
    component: AddEditPostComponent,
  },
  {
    path: ':id/details',
    component: PostDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
