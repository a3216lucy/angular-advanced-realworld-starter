import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  post = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
    body: this.fb.control(''),
    tags: this.fb.array([
      this.fb.control('Angular'),
      this.fb.control('HTML'),
      this.fb.control('CSS'),
    ]),
  });
  constructor(private fb: FormBuilder) {}

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
  }
}
