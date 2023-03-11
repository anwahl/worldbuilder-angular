import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Resource } from '../../model/resource';
import { WorldStorageService } from '../../service/world-storage.service';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {

  resources: Resource[];
  world: World;
  loading = false;
  resourceToDelete: Resource;
  worldId: string;
  ds: MatTableDataSource<Resource>;
  columnsToDisplay = ["update","name","description","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private resourceService: ResourceService,
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
      this.resourceService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.resources = data;
        this.ds = new MatTableDataSource<Resource>(this.resources);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.resourceService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.resources = data;
            this.ds = new MatTableDataSource<Resource>(this.resources);
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

  navigateToResource(resource: Resource){
    this.router.navigate(['../resource', resource.id], { relativeTo: this.route });
  }

  deleteConfirm(resource: Resource) {
    this.resourceToDelete = resource;
    this.modalService.open('deleteResourceConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteResource(resource: Resource) {
   this.closeModal()
   this.loading = true;
    this.resourceService.delete(resource)
        .subscribe(response => {
          this.alertService.success('Resource ' + resource.name + ' was successfully deleted.');
          this.loading = false;
          this.resources = this.resources.filter(item => item.id !== resource.id);
          this.ds = new MatTableDataSource<Resource>(this.resources);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Resource ' + resource.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
