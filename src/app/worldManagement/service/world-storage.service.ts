import { Injectable } from '@angular/core';

const WORLD_KEY = 'cur-world';

@Injectable({
  providedIn: 'root'
})
export class WorldStorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveWorld(world: any): void {
    window.sessionStorage.removeItem(WORLD_KEY);
    window.sessionStorage.setItem(WORLD_KEY, JSON.stringify(world));
  }

  public getWorld(): any {
    const world = window.sessionStorage.getItem(WORLD_KEY);
    if (world) {
      return JSON.parse(world);
    }

    return {};
  }

  public removeWorld(): void {
    const world = window.sessionStorage.getItem(WORLD_KEY);
    if (world) {
      window.sessionStorage.removeItem(WORLD_KEY);
    }
  }

  public exists(): boolean {
    const world = window.sessionStorage.getItem(WORLD_KEY);
    if (world) {
      return true;
    }

    return false;
  }

  public existsById(id: String): boolean {
    const world = window.sessionStorage.getItem(WORLD_KEY);
    if(world) {
      if (JSON.parse(world).id == id) {
        return true;
      }
    }

    return false;
  }
}