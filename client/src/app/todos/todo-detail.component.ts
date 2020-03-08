import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo-detail-component',
    templateUrl: 'todo-detail.component.html',
    styleUrls: ['./todo-detail.component.scss'],
    providers: []
})
export class TodoDetailComponent implements OnInit {
    constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  todo: Todo;
  id: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.todoService.getTodoById(this.id).subscribe(todo => this.todo = todo);
    });
  }
}
