
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

export interface DataStoreItem<T = any> {
  set(data: T): void;
  get(): T;
  clear(): void;
  // destroy(): void;
  listener$(): Observable<any>;
}

export abstract class DataStoreBase<T = any> {

  /* Private Properties */
  private cache = new Map();
  private listeners = {};

  /* Private Methods */
  private set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  private get(key: string): any {
    return this.cache.get(key);
  }

  private clear(key: string): void {
    this.cache.set(key, undefined);
  }

  // private destroy(key: string): void {
  //   this.cache.delete(key);
  // }

  private isKeyExists(key: string): boolean {
    return this.listeners.hasOwnProperty(key);
  }

  private throwDuplicateKeyError(key: string): void {
    throw (`Error in DataStoreBase. The key - '${key}' is already in use. Use a different key.`);
  }

  protected manageStoreValue<T = any>(
    key
      : string,
    listenerType
      : Subject<T>
      | BehaviorSubject<T>
      | ReplaySubject<T> = new Subject<T>()
  ): DataStoreItem<T> {

    if (this.isKeyExists(key)) { this.throwDuplicateKeyError(key); }

    this.listeners[key] = listenerType;

    return {
      set: (data: T) => {
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
      // destroy: () => {
      //   this.destroy(key);
      //   delete this.listeners[key];
      // },
      listener$: () => this.listeners[key]
    };
  }
}