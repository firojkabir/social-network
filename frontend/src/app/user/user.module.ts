import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationUtil } from '../utils/translation.util';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/user/');
}

@NgModule({
  declarations: [UserComponent, AddEditUserComponent, UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: TranslationUtil.getDefaultLanguage(),
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
      extend: true,
    }),
  ],
})
export class UserModule {}
