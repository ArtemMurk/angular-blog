import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private postService: PostService,
              private alert: AlertService) { }

  ngOnInit() {
    this.postService.getAll().subscribe( posts => {
      this.posts = posts;
    } , () => {
      this.alert.danger('Ошибка загрузки постов');
    });
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      console.log('Delete post', this.posts);
      this.posts = this.posts.filter(post =>  post.id !== id);
      this.alert.warning('Пост был удален');
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
