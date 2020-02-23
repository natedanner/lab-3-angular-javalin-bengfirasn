import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

@Injectable()
export class MockTodoService extends TodoService {
    static testTodos: Todo[] = [
        {
            _id: 'banana-id',
            owner: 'Tom Thomson',
            status: false,
            body: 'Buy bananas',
            category: 'Groceries'
        },
        {
            _id: 'plant-id',
            owner: 'Joe Smith',
            status: true,
            body: 'Water the plants',
            category: 'Home'
        },
        {
            _id: 'vacuum-id',
            owner: 'Jane Doe',
            status: false,
            body: 'Vacuum the house',
            category: 'Home'
        },
        {
            _id: 'phone-id',
            owner: 'Joe Smith',
            status: false,
            body: 'Return Jane\'s phone call',
            category: 'Telephone'
        }
    ];

    constructor() {
        super(null);
    }

    getTodos(filters: {status?: string}): Observable<Todo[]> {
        return of(MockTodoService.testTodos);
    }

    getTodoById(id: string): Observable<Todo> {
        if (id === MockTodoService.testTodos[0]._id) {
            return of(MockTodoService.testTodos[0]);
        } else {
            return of(null);
        }
    }
}
