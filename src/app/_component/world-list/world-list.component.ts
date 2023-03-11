import { Component, OnInit, ViewChild } from '@angular/core';
import { World } from '../../_model/world';
import { WorldService } from '../../_service/world.service';
import { ModalService } from '../../_modal';
import { AlertService } from '../../_alert';
import { StorageService } from 'src/app/_module/user-management/service/storage.service';
import { User } from 'src/app/_module/user-management/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.css']
})
export class WorldListComponent implements OnInit {

  worlds: World[];
  isLoggedIn = false;
  userWorlds = true;
  publicWorlds = false;
  storageServer: StorageService;
  user: User;
  public loading = false;
  worldToDelete: World;
  ds: MatTableDataSource<World>;
  columnsToDisplay: string[];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;
  
  constructor(private worldService: WorldService,
      private storageService: StorageService,
      private modalService: ModalService,
      private alertService: AlertService) {
        this.loading = true;
  }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.loading = true;
    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();

      this.worldService.findByUser(this.user).subscribe(data => {
        this.loading = false;
        this.worlds = data;
        this.columnsToDisplay = ["update","manage","name","description","isPrivate","delete"];
        this.ds = new MatTableDataSource<World>(this.worlds);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      }, (err) => { console.error(err)});
    } else {
      this.worldService.findAll().subscribe(data => { 
        this.userWorlds = false;
        this.loading = false;
        this.worlds = data;
        this.columnsToDisplay = ["view","user","name","description"];
        this.ds = new MatTableDataSource<World>(this.worlds);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    }
  }

  viewPublicWorlds() {
    this.loading = true;
    this.worldService.findAll().subscribe(data => {
      this.loading = false;
      this.worlds = data;
      this.userWorlds = false;
      this.publicWorlds = true;
      this.columnsToDisplay = ["view","user","name","description"];
      this.ds = new MatTableDataSource<World>(this.worlds);
      this.ds.sort = this.sort;
      this.ds.paginator = this.paginator;
    });
    
  }

  viewUserWorlds() {
    this.loading = true;
    this.worldService.findByUser(this.user).subscribe(data => {
      this.loading = false;
      this.worlds = data;
      this.userWorlds = true;
      this.publicWorlds = false;
      this.columnsToDisplay = ["update","manage","name","description","isPrivate","delete"];
      this.ds = new MatTableDataSource<World>(this.worlds);
      this.ds.sort = this.sort;
      this.ds.paginator = this.paginator;
    });
  }

  deleteConfirm(world: World) {
    this.worldToDelete = world;
    this.modalService.open('deleteWorldConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteWorld(world: World) {
   this.closeModal()
   this.loading = true;
    this.worldService.delete(world)
        .subscribe(response => {
          this.alertService.success('World ' + world.name + ' was successfully deleted.');
          this.loading = false;
          this.worlds = this.worlds.filter(item => item.id !== world.id);
          this.ds = new MatTableDataSource<World>(this.worlds);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('World ' + world.name + ' could not deleted. Reason: ' + err.error);
        });
  }

  showContent(content: string) {
    this.content = content;
    this.modalService.open('showContent');
  }
}