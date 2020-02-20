import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    readonly todoUrl: string = environment.API_URL + 'todos';

    constructor(private httpClient: HttpClient) {
    }

    getTodos(filters?): Observable<Todo[]> {
        return null;
    }

    getTodoById(id: string): Observable<Todo> {
        return null;
    }

    filterTodos(todos: Todo[], filters): Todo[] {
        return null;
    }
}
