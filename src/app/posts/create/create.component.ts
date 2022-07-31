import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  post = this.fb.group({
    title: this.fb.control('', { validators: [Validators.required] }),
    description: this.fb.control(''),
    body: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    tags: this.fb.array([
      this.fb.control('Angular'),
      this.fb.control('HTML'),
      this.fb.control('CSS'),
    ]),
  });
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  addTag(tag: string) {
    this.post.controls.tags.push(this.fb.control(tag));

    // Angular 14 以前的寫法
    // (this.post.get('tags') as FormArray).controls.push()
  }

  removeTag(index: number) {
    this.post.controls.tags.removeAt(index);
  }

  createPost() {
    // this.post.patchValue(this.post);
    console.log(this.post.value);

    const articles = {
      title: this.post.value.title || '',
      description: this.post.value.description || '',
      body: this.post.value.body || '',
      tagList: <Array<string>>(this.post.value.tags || []),
    };

    this.postService.createArticle(articles).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
