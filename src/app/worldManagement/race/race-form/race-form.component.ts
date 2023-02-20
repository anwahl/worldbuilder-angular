import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Race } from '../../model/race';
import { WorldStorageService } from '../../service/world-storage.service';
import { RaceService } from '../service/race.service';

@Component({
  selector: 'app-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.css',]
})
export class RaceFormComponent {
  race: Race;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private raceService: RaceService, 
        private alertService: AlertService,
        private worldStorage: WorldStorageService) {
  }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.race = new Race();
    this.race.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.raceService.findById(this.id).subscribe({
        next: raceData => {
          this.loading = false;
          this.race = raceData;
        },
        error: raceErr => {
          this.loading = false;
          this.alertService.error("Error retrieving race: " + raceErr.error.error);
        }
      });
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.isAddMode) {
      this.raceService.create(this.race).subscribe({
        next: result => { 
          this.loading = false;
          this.alertService.success("Race saved successfully!");
          this.gotoRaceList() },
        error: err => {
          this.loading = false;
          this.alertService.error("Error creating race: " + err.error.error);
        }});
    } else {
      this.raceService.update(this.race).subscribe({
        next: result => { 
          this.loading = false;
          this.alertService.success("Race updated successfully!");
          this.gotoRaceList() },
        error: err => {
          this.loading = false;
          this.alertService.error("Error updating race: " + err.error.error);
        }});
    }
  }

  
  gotoRaceList() {
    this.router.navigate(['../races'], { relativeTo: this.route });
  }
}
