import { BehaviorSubject, Observable } from "rxjs";

export interface CodeDescription {
    code: string;
    description: string;
}

export interface Visibility {
    visible: boolean;
    readOnly: boolean
}

export class Action<T> {
    private actionSubject: BehaviorSubject<T>;

    action$: Observable<T>;

    constructor(initialValue: T) {
        this.actionSubject = new BehaviorSubject(initialValue);
        this.action$ = this.actionSubject.asObservable();
    }

    execute(value: T) {
        this.actionSubject.next(value);
    }
}