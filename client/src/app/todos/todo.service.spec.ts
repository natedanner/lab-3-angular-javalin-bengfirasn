import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service', () => {
    const testTodos: Todo[] = [
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
    let todoService: TodoService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        // Set up the mock handling of the HTTP requests
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        // Construct an instance of the service with the mock
        // HTTP client.
        todoService = new TodoService(httpClient);
      });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('getTodos calls api/todos', () => {
        todoService.getTodos().subscribe(
            todos => expect(todos).toBe(testTodos)
        );
        // Specify that (exactly) one request will be made to the specified URL.
        const req = httpTestingController.expectOne(todoService.todoUrl);
        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');
        // Specify the content of the response to that request. This
        // triggers the subscribe above, which leads to that check
        // actually being performed.
        req.flush(testTodos);
    });

    it('getTodos calls api/todos with filter parameter \'status\'', () => {
      todoService.getTodos({status: 'incomplete'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('status')).toEqual('incomplete');
      req.flush(testTodos);
    });

    it('getTodoByID() calls api/todos/id', () => {
      const targetTodo: Todo = testTodos[1];
      const targetId: string = targetTodo._id;
      todoService.getTodoById(targetId).subscribe(
        todo => expect(todo).toBe(targetTodo)
      );

      const expectedUrl: string = todoService.todoUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(targetTodo);
    });

    it('filterTodos() filters by owner', () => {
      expect(testTodos.length).toBe(4);
      const todoOwner = 'Joe';
      expect(todoService.filterTodos(testTodos, { owner: todoOwner }).length).toBe(2);
    });

    it('filterTodos() filters by body', () => {
      expect(testTodos.length).toBe(4);
      const todoBody = 'the';
      expect(todoService.filterTodos(testTodos, { body: todoBody }).length).toBe(2);
    });

    it('filterTodos() filters by category', () => {
      expect(testTodos.length).toBe(4);
      const todoCategory = 'Home';
      expect(todoService.filterTodos(testTodos, { category: todoCategory }).length).toBe(2);
    });

    it('filterTodos() filters by multiple parameters', () => {
      expect(testTodos.length).toBe(4);
      const todoOwner = 'Joe';
      const todoCategory = 'Home';
      expect(todoService.filterTodos(testTodos, { owner: todoOwner, category: todoCategory }).length).toBe(1);
    });

    it('filterTodos() filters by multiple exclusive parameters', () => {
      expect(testTodos.length).toBe(4);
      const todoOwner = 'Jane';
      const todoCategory = 'Groceries';
      expect(todoService.filterTodos(testTodos, { owner: todoOwner, category: todoCategory }).length).toBe(0);
    });

    it('filterTodos() limits results shown', () => {
      expect(testTodos.length).toBe(4);
      expect(todoService.filterTodos(testTodos, {limit: 3}).length).toBe(3);
    });
  });
