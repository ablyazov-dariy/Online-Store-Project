import {
    ItemWithId,
    LocalStorageInterface
} from "./localStorage.interface";
import {Observable, Subject} from "rxjs";
import {startWith} from "rxjs/operators";

export class LocalStorageClass<T extends ItemWithId> implements LocalStorageInterface<T> {
    private data: {count: number, itemData: T}[];
    private data$: Subject<{count: number, itemData: T}[]> = new Subject<{count: number, itemData: T}[]>();
    constructor(public readonly accessKey: string) {
        const storedData = localStorage.getItem(this.accessKey)
        storedData ? this.data = JSON.parse(storedData) as {count: number, itemData: T}[] : this.data = []
        window.addEventListener('storage', this.handleStorageEvent.bind(this))
    }

    getData(): T[] {
        return this.data.map(el => el.itemData)
    }

    public setItemOrIncrementCount(item: T): void {
        const index = this.data.findIndex(el => el.itemData.id === item.id)
        if (index === -1) {
            this.data.push({count: 1, itemData: item})
        }
        else {
            this.data[index].count ++
        }
        this.saveDataToLocalStorage()
    }

    public getItem(id: number): T | undefined {
        const existingEl = this.data.find(el => el.itemData.id === id)
        return existingEl ? existingEl.itemData : undefined
    }

    public removeItemOrDecrementCount(id: number): void {
        const index = this.data.findIndex(el => el.itemData.id === id)
        if (index === -1) return
        this.data[index].count --
        if (this.data[index].count <= 0) {
            this.data.splice(index, 1)
        }
        this.saveDataToLocalStorage();
    }

    clearAll(): void {
        this.data = []
        this.saveDataToLocalStorage()
    }

    private saveDataToLocalStorage(): void {
        localStorage.setItem(this.accessKey, JSON.stringify(this.data));
        this.data$.next(this.data)
    }


    private handleStorageEvent(event: StorageEvent): void {
        if (event.key !== this.accessKey) return
        if (!event.newValue) return;
        this.data = JSON.parse(event.newValue) as {count: number, itemData: T}[];
        this.data$.next(this.data)
    }
    public getDataObservable(): Observable<{count: number, itemData: T}[]> {
        return this.data$.asObservable().pipe(startWith(this.data))
    }
}
