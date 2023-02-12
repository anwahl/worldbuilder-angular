import { Component, OnInit } from '@angular/core';
import { World } from '../../_model/world';
import { WorldService } from '../../_service/world.service';
import { StorageService } from '../../_service/storage.service';
import { User } from '../../_model/user';
import { ModalService } from '../../_modal';
import { AlertService } from '../../_alert';


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
      }, (err) => { console.error(err)});
    } else {
      this.worldService.findAll().subscribe(data => { 
        this.loading = false;
        this.worlds = data;
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
    });
    
  }

  viewUserWorlds() {
    this.loading = true;
    this.worldService.findByUser(this.user).subscribe(data => {
      this.loading = false;
      this.worlds = data;
      this.userWorlds = true;
      this.publicWorlds = false;
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
        }, err => { 
          this.alertService.error('World ' + world.name + ' could not deleted. Reason: ' + err);
        });
  }
}