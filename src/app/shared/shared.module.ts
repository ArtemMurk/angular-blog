import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {PostService} from './post.service';
import {AuthService} from '../admin/shared/services/auth.service';
import {AuthInterceptor} from './auth.interceptor';

const INTERCEPTORS_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ],
  providers: [
    INTERCEPTORS_PROVIDER,
    PostService,
    AuthService
  ]
})
export class SharedModule {

}
