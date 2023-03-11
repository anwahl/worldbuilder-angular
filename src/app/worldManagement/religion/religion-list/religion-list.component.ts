import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Religion } from '../../model/religion';
import { WorldStorageService } from '../../service/world-storage.service';
import { ReligionService } from '../service/religion.service';

@Component({
  selector: 'app-religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.css']
})
export class ReligionListComponent {

  religions: Religion[];
  world: World;
  loading = false;
  religionToDelete: Religion;
  worldId: string;
  ds: MatTableDataSource<Religion>;
  columnsToDisplay = ["update","name","description","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private religionService: ReligionService,
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
      this.religionService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.religions = data;
        this.ds = new MatTableDataSource<Religion>(this.religions);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.religionService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.religions = data;
            this.ds = new MatTableDataSource<Religion>(this.religions);
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

  navigateToReligion(religion: Religion){
    this.router.navigate(['../religion', religion.id], { relativeTo: this.route });
  }

  deleteConfirm(religion: Religion) {
    this.religionToDelete = religion;
    this.modalService.open('deleteReligionConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteReligion(religion: Religion) {
   this.closeModal()
   this.loading = true;
    this.religionService.delete(religion)
        .subscribe(response => {
          this.alertService.success('Religion ' + religion.name + ' was successfully deleted.');
          this.loading = false;
          this.religions = this.religions.filter(item => item.id !== religion.id);
          this.ds = new MatTableDataSource<Religion>(this.religions);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Religion ' + religion.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
