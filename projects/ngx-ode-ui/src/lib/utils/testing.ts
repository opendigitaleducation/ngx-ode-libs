import { DebugElement } from '@angular/core';

export function getText(el: DebugElement): string {
    return el.nativeElement.textContent.trim();
}

export function clickOn(el: DebugElement): void {
    return el.triggerEventHandler('click', null);
}
