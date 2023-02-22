import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
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
  worldId: string;
  ds: MatTableDataSource<Race>;
  columnsToDisplay = ["update","name","description","trait","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private raceService: RaceService,
      private modalService: ModalService,
      private alertService: AlertService,
      private worldStorage: WorldStorageService,
      private route: ActivatedRoute,
      private worldService: WorldService,
      private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.parent ? this.route.parent.params.subscribe(
      param => { this.worldId = param['id']; }) : null
    if (this.worldStorage.existsById(this.worldId)){
      this.world = this.worldStorage.getWorld();
      this.raceService.findByWorld(this.world).subscribe(data => {
        this.loading = false;
        this.races = data;
        this.ds = new MatTableDataSource<Race>(this.races);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.raceService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.races = data;
            this.ds = new MatTableDataSource<Race>(this.races);
            this.ds.sort = this.sort;
            this.ds.paginator = this.paginator;

          });
        }, error: err => {
          this.alertService.error('Could not load World. ' + err);
        }});
    };
  }

  showContent(content: string) {
    this.content = content;
    this.modalService.open('showContent');
  }

  navigateToRace(race: Race){
    this.router.navigate(['../race', race.id], { relativeTo: this.route });
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
          this.ds = new MatTableDataSource<Race>(this.races);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Race ' + race.name + ' could not deleted. Reason: ' + err);
        });
  }
}
