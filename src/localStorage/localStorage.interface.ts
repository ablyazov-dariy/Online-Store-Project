import {BehaviorSubject, Observable} from "rxjs";

export interface ItemWithId {
    id: number;
}

export interface LocalStorageInterface<T extends ItemWithId> {
    readonly accessKey: string;
    getData(): T[]
    setItemOrIncrementCount(item: T): void;
    getItem(id: number): T | undefined
    removeItemOrDecrementCount(id: number): void;
    clearAll(): void
    getDataObservable(): Observable<{count: number, itemData: T}[]>
}