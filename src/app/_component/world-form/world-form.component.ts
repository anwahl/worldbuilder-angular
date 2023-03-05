import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { WorldService } from '../../_service/world.service';
import { World } from '../../_model/world';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-world-form',
  templateUrl: './world-form.component.html',
  styleUrls: ['./world-form.component.css']
})
export class WorldFormComponent {

  errorMessage = '';
  submitFailed = false;
  world: World;
  id: string;
  isAddMode: boolean;
  curUrl: string | undefined;
  public loading = false;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
      private alertService: AlertService,
        private worldService: WorldService) {
    this.curUrl = this.router.url;
    console.log(this.curUrl);
    this.world = new World();
  }

  ngOnInit() {
    if(this.route.parent) {
      this.id = this.route.parent.snapshot.params['id'];
    } else {
      this.id = this.route.snapshot.params['id'];
    }
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.loading = true;
      this.worldService.findById(this.id).subscribe((response: World) => {
        this.loading = false;
        this.world = response;
      }, (err) => {
        this.alertService.error("Error retrieving world: " + err.error.error);
      });
    }
  }

  onSubmit() {
    this.world.name = this.world.name.trim();
    this.world.description = this.world.description.trim();
    if (this.isAddMode) {
      this.worldService.create(this.world).subscribe({
        next: result => { 
          this.loading = false;
          this.gotoWorldList() },
        error: err => {
          this.loading = false;
          this.alertService.error("Error creating world: " + err.error.error);
        }});
    } else {
      this.worldService.update(this.world).subscribe({
        next: result => { 
          this.loading = false;
          this.gotoWorldList() },
        error: err => {
          this.loading = false;
          this.alertService.error("Error updating world: " + err.error.error);
        }});
    }
  }
  

  gotoWorldList() {
    if (this.curUrl?.includes("manage")) {
      this.router.navigate([this.curUrl]).then(page => { window.location.reload(); });;
    } else {
      this.router.navigate(['/worlds']);
    }
  }
}