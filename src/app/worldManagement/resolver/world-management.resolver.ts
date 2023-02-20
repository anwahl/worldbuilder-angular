import { Injectable } from '@angular/core';
import {inject} from '@angular/core';
import {EMPTY, of, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {
  Router, Resolve,
  RouterStateSnapshot, ResolveFn,
  ActivatedRouteSnapshot
} from '@angular/router';
import { WorldService } from '../../_service/world.service';
import { World } from '../../_model/world';

export const WorldManagementResolver: ResolveFn<World> = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const ws = inject(WorldService);
    const id = route.paramMap.get('id')!;
  
    return ws.findById(id).pipe(mergeMap(world => {
      if (world) {
        return of(world);
      } else {  // id not found
        router.navigate(['/world-management']);
        return EMPTY;
      }
    }));
  }
