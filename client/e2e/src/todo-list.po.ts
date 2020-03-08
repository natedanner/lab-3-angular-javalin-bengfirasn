import {browser, by, element, Key, ElementFinder} from 'protractor';

export class TodoPage {

    static isSorted(toCheck: any[]): boolean {
        return toCheck.every((ele, loc) => {
            if (loc === 0) {
                return true;
            } else {
                return toCheck[loc - 1] <= ele;
            }
        });
    }
    navigateTo() {
        return browser.get('/todos');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getTodoTitle() {
        let title = element(by.className('todo-list-title')).getText();
        return title;
    }

    getTodoListItems() {
        return element(by.className('todo-nav-list')).all(by.className('todo-list-item'));
    }

    backspace() {
        browser.actions().sendKeys(Key.BACK_SPACE).perform();
    }

    typeInput(inputId: string, text: string) {
        let input = element(by.id(inputId));
        input.click();
        input.sendKeys(text);
    }

    clickDetails(entry: ElementFinder) {
        return entry.element(by.buttonText('DETAILS')).click();
    }

    selectMatSelectValue(selectID: string, value: string) {
        let sel = element(by.id(selectID));
        return sel.click().then(() => {
            return element(by.css('mat-option[value="' + value + '"]')).click();
        });
    }

}
