import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { PoliticalSystem } from '../../model/political-system';
import { WorldStorageService } from '../../service/world-storage.service';
import { PoliticalSystemService } from '../service/political-system.service';

@Component({
  selector: 'app-political-system-list',
  templateUrl: './political-system-list.component.html',
  styleUrls: ['./political-system-list.component.css']
})
export class PoliticalSystemListComponent {

  politicalSystems: PoliticalSystem[];
  world: World;
  loading = false;
  politicalSystemToDelete: PoliticalSystem;
  worldId: string;
  ds: MatTableDataSource<PoliticalSystem>;
  columnsToDisplay = ["update","name","description","type","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private politicalSystemService: PoliticalSystemService,
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
      this.politicalSystemService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.politicalSystems = data;
        this.ds = new MatTableDataSource<PoliticalSystem>(this.politicalSystems);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.politicalSystemService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.politicalSystems = data;
            this.ds = new MatTableDataSource<PoliticalSystem>(this.politicalSystems);
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

  navigateToPoliticalSystem(politicalSystem: PoliticalSystem){
    this.router.navigate(['../politicalSystem', politicalSystem.id], { relativeTo: this.route });
  }

  deleteConfirm(politicalSystem: PoliticalSystem) {
    this.politicalSystemToDelete = politicalSystem;
    this.modalService.open('deletePoliticalSystemConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deletePoliticalSystem(politicalSystem: PoliticalSystem) {
   this.closeModal()
   this.loading = true;
    this.politicalSystemService.delete(politicalSystem)
        .subscribe(response => {
          this.alertService.success('PoliticalSystem ' + politicalSystem.name + ' was successfully deleted.');
          this.loading = false;
          this.politicalSystems = this.politicalSystems.filter(item => item.id !== politicalSystem.id);
          this.ds = new MatTableDataSource<PoliticalSystem>(this.politicalSystems);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('PoliticalSystem ' + politicalSystem.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
