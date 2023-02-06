import { Component, OnInit } from '@angular/core';
import { World } from '../_model/world';
import { WorldService } from '../_service/world.service';

@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.css']
})
export class WorldListComponent implements OnInit {

  worlds: World[];

  constructor(private worldService: WorldService) {
  }

  ngOnInit() {
    this.worldService.findAll().subscribe(data => {
      this.worlds = data;
    });
  }
}