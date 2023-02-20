import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { Race } from '../../model/race';
import { WorldStorageService } from '../../service/world-storage.service';
import { RaceService } from '../service/race.service';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent {

  races: Race[];
  world: World;
  loading = false;
  raceToDelete: Race;

  constructor(private raceService: RaceService,
      private modalService: ModalService,
      private alertService: AlertService,
      private worldStorage: WorldStorageService) {
  }

  ngOnInit() {
      this.world = this.worldStorage.getWorld();
      this.loading = true;
      this.raceService.findByWorld(this.world).subscribe(data => {
        this.loading = false;
        this.races = data;
      });
  }

  deleteConfirm(race: Race) {
    this.raceToDelete = race;
    this.modalService.open('deleteRaceConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteRace(race: Race) {
   this.closeModal()
   this.loading = true;
    this.raceService.delete(race)
        .subscribe(response => {
          this.alertService.success('Race ' + race.name + ' was successfully deleted.');
          this.loading = false;
          this.races = this.races.filter(item => item.id !== race.id);
        }, err => { 
          this.alertService.error('Race ' + race.name + ' could not deleted. Reason: ' + err);
        });
  }
}
