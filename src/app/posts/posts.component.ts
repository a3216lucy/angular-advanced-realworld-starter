import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  articles!: Article[];

  articles$: Observable<Article[]> = this.postService
    .getArticles()
    .pipe(map((result) => result.articles));

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.articles$.subscribe();
    // this.postService.getArticles().subscribe({
    //   next: (res) => {
    //     this.articles = res.articles;
    //   },
    // });
  }
}
