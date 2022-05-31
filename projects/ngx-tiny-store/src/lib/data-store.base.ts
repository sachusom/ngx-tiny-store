
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

export interface DataStoreItem<T> {
  init(): void;
  set(data: T): void;
  get(): T | any;
  clear(): void;
  listener$(): Observable<any>;
}

export abstract class DataStoreBase {

  /* Private Properties */
  private cache = new Map();
  private listeners = [];

  /* Private Methods */
  protected set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  protected get(key: string): any {
    return this.cache.get(key);
  }

  protected clear(key: string): void {
    this.cache.delete(key);
  }

  protected abstract initListeners(): void;

  protected manageStoreValue<T>(
    key
      : string,
    listenerType
      : Subject<any>
      | BehaviorSubject<any>
      | ReplaySubject<any> = new Subject<any>()
  ): DataStoreItem<T> {
    return {
      init: () => this.listeners[key] = listenerType,
      set: (data: any) => {
        this.set(key, data);
        this.listeners[key as any]
          ? this.listeners[key].next(data)
          : null;
      },
      get: () => this.get(key),
      clear: () => {
        this.clear(key);
        this.listeners[key as any]
          ? this.listeners[key].next(undefined)
          : null;
      },
      listener$: () => this.listeners[key]
    };
  }
}