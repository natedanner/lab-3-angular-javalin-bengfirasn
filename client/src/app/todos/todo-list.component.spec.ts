import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: any[] = [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    BrowserAnimationsModule,
    RouterTestingModule,
  ];

describe('Todo list', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [COMMON_IMPORTS],
        declarations: [TodoListComponent],
        providers: [{ provide: TodoService, useValue: new MockTodoService() }]
      });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
          fixture = TestBed.createComponent(TodoListComponent);
          todoList = fixture.componentInstance;
          fixture.detectChanges();
        });
      }));

    it('contains all the todos', () => {
        expect(todoList.serverFilteredTodos.length).toEqual(4);
    });

    it('contains a todo owned by Jane Doe', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Jane Doe')).toBe(true);
    });

    it('contains two todos owned by Joe Smith', () => {
        expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.owner === 'Joe Smith').length).toBe(2);
    });

    it('contains a todo with the category \'Groceries\'', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.category === 'Groceries')).toBe(true);
    });

    it('doesn\'t contain a todo owned by Batman', () => {
        expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Batman')).toBe(false);
    });

});

describe('Misbehaving Todo List', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoServiceStub: {
      getTodos: () => Observable<Todo[]>;
      getTodosFiltered: () => Observable<Todo[]>;
    };

    beforeEach(() => {
      // stub TodoService for test purposes
        todoServiceStub = {
            getTodos: () => new Observable(observer => {
                observer.error('Error-prone observable');
            }),
            getTodosFiltered: () => new Observable(observer => {
                observer.error('Error-prone observable');
            })
        };

        TestBed.configureTestingModule({
            imports: [COMMON_IMPORTS],
            declarations: [TodoListComponent],
            providers: [{ provide: TodoService, useValue: todoServiceStub }]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('generates an error if we don\'t set up a todo list service', () => {
        expect(todoList.serverFilteredTodos).toBeUndefined();
    });

});
