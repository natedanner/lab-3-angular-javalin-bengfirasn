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

});
