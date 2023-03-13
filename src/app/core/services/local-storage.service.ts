import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): (T | null) {
    if (typeof window === 'undefined') return null;
    let item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
  }

  clear(key: string): void {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }

}
