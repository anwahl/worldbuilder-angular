import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorldService } from '../_service/world.service';
import { World } from '../_model/world';

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
  public loading = false;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private worldService: WorldService) {
    
    this.world = new World();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.loading = true;
      this.worldService.findById(this.id).subscribe((response: World) => {
        this.loading = false;
        this.world = response;
      }, (err) => {
        console.log(err);
      });
    }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.worldService.create(this.world).subscribe({
        next: result => { 
          this.loading = false;
          this.gotoWorldList() },
        error: err => {
          this.loading = false;
          this.errorMessage = err.error.title + "; " + err.error.detail;
          this.submitFailed = true;
        }});
    } else {
      this.worldService.update(this.world).subscribe({
        next: result => { 
          this.loading = false;
          this.gotoWorldList() },
        error: err => {
          this.loading = false;
          this.errorMessage = err.error.title + "; " + err.error.detail;
          this.submitFailed = true;
        }});
    }
  }
  

  gotoWorldList() {
    this.router.navigate(['/worlds']);
  }
}