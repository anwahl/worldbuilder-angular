import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';

@Component({
  selector: 'app-world-management',
  templateUrl: './world-management.component.html',
  styleUrls: ['./world-management.component.css']
})
export class WorldManagementComponent {

  world: World;
  worldName: string;
  id: string;
  public resolving = true;
  changeLog: string[];
  


  constructor(
    private route: ActivatedRoute,
        private worldService: WorldService) {
      
  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.resolving = true;
    this.id = this.route.snapshot.params['id'];
      this.worldService.findById(this.id).subscribe({
        next: response => {
          this.resolving = false;
          this.world = response;
          this.worldName = this.world.name;
          window.sessionStorage.setItem('cur-world', JSON.stringify(this.world));
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
