import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { SocialClass } from '../../model/social-class';
import { WorldStorageService } from '../../service/world-storage.service';
import { SocialClassService } from '../service/social-class.service';

@Component({
  selector: 'app-social-class-list',
  templateUrl: './social-class-list.component.html',
  styleUrls: ['./social-class-list.component.css']
})
export class SocialClassListComponent {

  socialClasss: SocialClass[];
  world: World;
  loading = false;
  socialClassToDelete: SocialClass;
  worldId: string;
  ds: MatTableDataSource<SocialClass>;
  columnsToDisplay = ["update","name","description","region","race","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private socialClassService: SocialClassService,
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
      this.socialClassService.findByWorld(this.world).subscribe(data => {
        this.loading = false;
        this.socialClasss = data;
        this.ds = new MatTableDataSource<SocialClass>(this.socialClasss);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.socialClassService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.socialClasss = data;
            this.ds = new MatTableDataSource<SocialClass>(this.socialClasss);
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

  navigateToSocialClass(socialClass: SocialClass){
    this.router.navigate(['../socialClass', socialClass.id], { relativeTo: this.route });
  }

  deleteConfirm(socialClass: SocialClass) {
    this.socialClassToDelete = socialClass;
    this.modalService.open('deleteSocialClassConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteSocialClass(socialClass: SocialClass) {
   this.closeModal()
   this.loading = true;
    this.socialClassService.delete(socialClass)
        .subscribe(response => {
          this.alertService.success('SocialClass ' + socialClass.name + ' was successfully deleted.');
          this.loading = false;
          this.socialClasss = this.socialClasss.filter(item => item.id !== socialClass.id);
          this.ds = new MatTableDataSource<SocialClass>(this.socialClasss);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('SocialClass ' + socialClass.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
