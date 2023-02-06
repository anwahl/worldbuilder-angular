import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorldService } from '../_service/world.service';
import { World } from '../_model/world';

@Component({
  selector: 'app-world-form',
  templateUrl: './world-form.component.html',
  styleUrls: ['./world-form.component.css']
})
export class WorldFormComponent {

  world: World;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private worldService: WorldService) {
    this.world = new World();
  }

  onSubmit() {
    this.worldService.create(this.world).subscribe(result => this.gotoWorldList());
  }

  gotoWorldList() {
    this.router.navigate(['/worlds']);
  }
}