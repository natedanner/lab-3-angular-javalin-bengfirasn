import { TodoPage } from './todo-list.po';
import {browser, protractor, by, Key, element} from 'protractor';


describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
        page.navigateTo();
    });

    it('Should have the correct title', () => {
        expect(page.getTodoTitle()).toEqual('Todos');
    });

    it('Should type something in the owner field and recieve the correct elements', () => {
        page.typeInput('owner-input', 'Fry');

        page.getTodoListItems().each(e => {
            // Each element returned should have the owner 'Fry'
            expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Fry');
        });

        // All elements made by Fry should be returned
        expect(page.getTodoListItems().count()).toBe(61);
    });

    it('Should type something partial in the body field and recieve the correct elements', () => {
        page.typeInput('body-input', 'dolor');

        /*
         * Checks to make sure the body of each element contains 'dolor'.
         * Unfortunately, the only way to do this is to await the fulfillment
         * of the promise returned by getText, which in turn requires making
         * the function asynchronous.
         */
        page.getTodoListItems().each(async e => {
            let eText: string = await e.element(by.className('todo-list-body')).getText();
            expect(eText).toBeTruthy();
            expect(eText.includes('dolor'));
        });
    });

    it('Should type something in the category field and recieve the correct elements', () => {
        page.typeInput('category-input', 'homework');

        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-category')).getText()).toEqual('homework');
        });
        expect(page.getTodoListItems().count()).toEqual(79);
    });

    it('Should select status via radio button and recieve the correct elements', () => {
        // Protractor doesn't have an elegant way of interacting with radio buttons.
        element(by.id('status-buttons')).all(by.id('incomplete-button')).get(0).click();

        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-status')).getText()).toEqual('incomplete');
        });

        expect(page.getTodoListItems().count()).toBe(157);
    });

    it('Should input information in multiple fields and filter on all of them', () => {
        page.typeInput('category-input', 'groceries');
        page.typeInput('owner-input', 'Blanche');

        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-category')).getText()).toEqual('groceries');
            expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Blanche');
        });
    });

    it('Should filter on client and server simultaniously', () => {
        element(by.id('status-buttons')).all(by.id('incomplete-button')).get(0).click();
        page.typeInput('owner-input', 'Barry');

        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-status')).getText()).toEqual('incomplete');
            expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Barry');
        });
    });

    it('Should behave appropriately when the contents of a box is changed', () => {
        page.typeInput('owner-input', 'Fry');
        page.typeInput('owner-input', Key.BACK_SPACE.repeat(3));

        // Make sure that after the search box is empty, it is no longer filtering on anything
        let owners = page.getTodoListItems().map(e => e.element(by.className('todo-list-owner')).getText());
        expect(owners).toContain('Fry');
        expect(owners).toContain('Blanche');

        page.typeInput('owner-input', 'Roberta');
        // After typing a new input, it should filter on that new input.
        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Roberta');
        });
    });

    it('Should behave appropriately when the status selection is changed', () => {
        element(by.id('status-buttons')).all(by.id('incomplete-button')).get(0).click();

        let incompleteStatuses = page.getTodoListItems().map(e => e.element(by.className('todo-list-status')).getText()).then(x => x);
        expect(incompleteStatuses).not.toContain('complete');
        expect(incompleteStatuses).toContain('incomplete');
        // Select a radio button and make sure that it correctly filters.

        element(by.id('status-buttons')).all(by.id('complete-button')).get(0).click();

        let completeStatuses = page.getTodoListItems().map(e => e.element(by.className('todo-list-status')).getText()).then(x => x);
        expect(completeStatuses).not.toContain('incomplete');
        expect(completeStatuses).toContain('complete');
        // Change the filter and make sure that it filters only by the new rule.

        element(by.id('status-buttons')).all(by.id('no-filter-button')).get(0).click();

        let mixedStatuses = page.getTodoListItems().map(e => e.element(by.className('todo-list-status')).getText()).then(x => x);
        expect(mixedStatuses).toContain('complete');
        expect(mixedStatuses).toContain('incomplete');
        // Make sure that the rule no longer applies.


    });

    it('Should limit the number of filtered results returned', () => {
        page.typeInput('owner-input', 'Blanche');
        page.typeInput('limit-input', '25');

        page.getTodoListItems().each(e => {
            expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Blanche');
        });

        expect(page.getTodoListItems().count()).toBe(25);
    });

    /*

    it('should sort by category', () => {

        page.typeInput('limit-input', '100'); // If not limited, Javascript runs out of memory

        page.selectMatSelectValue('sort-type', 'category');


        page.getTodoListItems().map(e => e.element(by.className('category'))).then(ls => {
            expect(TodoPage.isSorted(ls)).toBe(true);
        });
    });

    it('should sort by different values in sequence', () => {
        page.selectMatSelectValue('sort-type', 'status');

        page.getTodoListItems().map(e => e.element(by.className('status'))).then(ls => {
            expect(TodoPage.isSorted(ls)).toBe(true);
        });

        page.selectMatSelectValue('sort-type', 'owner');

        page.getTodoListItems().map(e => e.element(by.className('owner'))).then(ls => {
            expect(TodoPage.isSorted(ls)).toBe(true);
        });

        page.selectMatSelectValue('sort-type', 'body');

        page.getTodoListItems().map(e => e.element(by.className('body'))).then(ls => {
            expect(TodoPage.isSorted(ls)).toBe(true);
        });
    });
    //*/
   // the tests on sorting are commented out, because they caused javascript to run out of memory.
   // we tried allocating more, but the numbers we tried didn't seem to be quite enough.
   // also, it crashed node.js once so that was fun
});


