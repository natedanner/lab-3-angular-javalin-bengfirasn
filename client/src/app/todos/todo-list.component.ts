import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: []
  })
export class TodoListComponent implements OnInit {
    public serverFilteredTodos: Todo[];
    public filteredTodos: Todo[];


    constructor(private todoService: TodoService) {

    }

    getTodosFromServer() {

    }

    public updateFilter() {

    }

    ngOnInit(): void {
      this.getTodosFromServer();
    }
}
