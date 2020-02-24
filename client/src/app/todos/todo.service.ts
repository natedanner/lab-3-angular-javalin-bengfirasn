import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
import { filter } from 'minimatch';

@Injectable()
export class TodoService {
    readonly todoUrl: string = environment.API_URL + 'todos';

    constructor(private httpClient: HttpClient) {
    }

    getTodos(filters?: { status?: string, orderBy?: string }): Observable<Todo[]> {
        let httpParams: HttpParams = new HttpParams();
        if (filters && filters.status) {
          httpParams = httpParams.set('status', filters.status);
        }
        return this.httpClient.get<Todo[]>(this.todoUrl, {
          params: httpParams,
        });
    }

    getTodoById(id: string): Observable<Todo> {
        return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
    }

    filterTodos(todos: Todo[], filters?: {owner?: string, category?: string, body?: string }): Todo[] {
        let filteredTodos = todos;

        if (filters.owner) {
            filters.owner = filters.owner.toLowerCase();

            filteredTodos = filteredTodos.filter(todo => {
                return todo.owner.toLowerCase().includes(filters.owner);
            });
        }

        if (filters.category) {
            filters.category = filters.category.toLowerCase();

            filteredTodos = filteredTodos.filter(todo => {
                return todo.category.toLowerCase().includes(filters.category);
            });
        }

        if (filters.body) {
            filters.body = filters.body.toLowerCase();

            filteredTodos = filteredTodos.filter(todo => {
                return todo.body.toLowerCase().includes(filters.body);
            });
        }

        return filteredTodos;
    }
}
