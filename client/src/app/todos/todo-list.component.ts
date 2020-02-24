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

    public todoStatus = '';
    public todoOwner: string;
    public todoCategory: string;
    public todoBody: string;


    constructor(private todoService: TodoService) {

    }

    getTodosFromServer() {
      this.todoService.getTodos(
        status ? {status: this.todoStatus} : {}
        ).subscribe(returnedTodos => {
        this.serverFilteredTodos = returnedTodos;
        this.updateFilter();
      }, err => {
        console.log(err);
      });
    }

    public updateFilter() {
      this.filteredTodos = this.todoService.filterTodos(
        this.serverFilteredTodos, {category: this.todoCategory, body: this.todoBody, owner: this.todoOwner});
    }

    ngOnInit(): void {
      this.getTodosFromServer();
    }
}
