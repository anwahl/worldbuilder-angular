import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Geography } from '../../model/geography';
import { WorldStorageService } from '../../service/world-storage.service';
import { GeographyService } from '../service/geography.service';
import { Resource } from '../../model/resource';

@Component({
  selector: 'app-geography-list',
  templateUrl: './geography-list.component.html',
  styleUrls: ['./geography-list.component.css']
})
export class GeographyListComponent {

  geographies: Geography[];
  world: World;
  loading = false;
  geographyToDelete: Geography;
  worldId: string;
  ds: MatTableDataSource<Geography>;
  columnsToDisplay = ["update","name","description","type","climate","resources","parentGeography","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private geographyService: GeographyService,
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
      this.geographyService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.geographies = data;
        this.ds = new MatTableDataSource<Geography>(this.geographies);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.geographyService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.geographies = data;
            this.ds = new MatTableDataSource<Geography>(this.geographies);
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
    this.modalService.open('showGeographyContent');
  }

  showResources(resources: Array<Resource>) {
    let content = '';
    for(let i = 0; i < resources.length; i++) {
      content = content.concat(resources[i].name + (i < resources.length-1 ? ', ' : ''));
    };
    this.content = content;
    this.modalService.open('showGeographyContent');
  }

  navigateToGeography(geography: Geography){
    this.router.navigate(['../geography', geography.id], { relativeTo: this.route });
  }

  deleteConfirm(geography: Geography) {
    this.geographyToDelete = geography;
    this.modalService.open('deleteGeographyConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteGeography(geography: Geography) {
   this.closeModal()
   this.loading = true;
    this.geographyService.delete(geography)
        .subscribe(response => {
          this.alertService.success('Geography ' + geography.name + ' was successfully deleted.');
          this.loading = false;
          this.geographies = this.geographies.filter(item => item.id !== geography.id);
          this.ds = new MatTableDataSource<Geography>(this.geographies);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Geography ' + geography.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
