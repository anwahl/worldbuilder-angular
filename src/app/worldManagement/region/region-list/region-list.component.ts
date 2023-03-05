import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Region } from '../../model/region';
import { WorldStorageService } from '../../service/world-storage.service';
import { RegionService } from '../service/region.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent {

  regions: Region[];
  world: World;
  loading = false;
  regionToDelete: Region;
  worldId: string;
  ds: MatTableDataSource<Region>;
  columnsToDisplay = ["update","name","description","municipality","jurisdiction","geography","politicalSystem","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private regionService: RegionService,
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
      this.regionService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.regions = data;
        this.ds = new MatTableDataSource<Region>(this.regions);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.regionService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.regions = data;
            this.ds = new MatTableDataSource<Region>(this.regions);
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

  navigateToRegion(region: Region){
    this.router.navigate(['../region', region.id], { relativeTo: this.route });
  }

  deleteConfirm(region: Region) {
    this.regionToDelete = region;
    this.modalService.open('deleteRegionConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteRegion(region: Region) {
   this.closeModal()
   this.loading = true;
    this.regionService.delete(region)
        .subscribe(response => {
          this.alertService.success('Region ' + region.name + ' was successfully deleted.');
          this.loading = false;
          this.regions = this.regions.filter(item => item.id !== region.id);
          this.ds = new MatTableDataSource<Region>(this.regions);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Region ' + region.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
