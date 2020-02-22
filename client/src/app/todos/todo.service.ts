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

    getTodos(filters?: { status?: boolean }): Observable<Todo[]> {
        let httpParams: HttpParams = new HttpParams();
        if (filters.status) {
          httpParams = httpParams.set('status', filters.status);
        }
        return this.httpClient.get<Todo[]>(this.todoUrl, {
          params: httpParams,
        });
    }

    getTodoById(id: string): Observable<Todo> {
        return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
    }

    filterTodos(todos: Todo[], filters): Todo[] {
        return null;
    }
}
