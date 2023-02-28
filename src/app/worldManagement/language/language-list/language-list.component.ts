import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { ModalService } from 'src/app/_modal';
import { World } from 'src/app/_model/world';
import { WorldService } from 'src/app/_service/world.service';
import { Language } from '../../model/language';
import { WorldStorageService } from '../../service/world-storage.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent {

  languages: Language[];
  world: World;
  loading = false;
  languageToDelete: Language;
  worldId: string;
  ds: MatTableDataSource<Language>;
  columnsToDisplay = ["update","name","description","delete"];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  content: String;

  constructor(private languageService: LanguageService,
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
      this.languageService.findByWorld(this.world).subscribe(data => {console
        this.loading = false;
        this.languages = data;
        this.ds = new MatTableDataSource<Language>(this.languages);
        this.ds.sort = this.sort;
        this.ds.paginator = this.paginator;
      });
    } else {
        this.worldService.findById(this.worldId).subscribe({next: data => {
          this.world = data;
          this.languageService.findByWorld(this.world).subscribe(data => {
            this.loading = false;
            this.languages = data;
            this.ds = new MatTableDataSource<Language>(this.languages);
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

  navigateToLanguage(language: Language){
    this.router.navigate(['../language', language.id], { relativeTo: this.route });
  }

  deleteConfirm(language: Language) {
    this.languageToDelete = language;
    this.modalService.open('deleteLanguageConfirm');
  }

  closeModal() {
    this.modalService.close();
  }

  deleteLanguage(language: Language) {
   this.closeModal()
   this.loading = true;
    this.languageService.delete(language)
        .subscribe(response => {
          this.alertService.success('Language ' + language.name + ' was successfully deleted.');
          this.loading = false;
          this.languages = this.languages.filter(item => item.id !== language.id);
          this.ds = new MatTableDataSource<Language>(this.languages);
          this.ds.sort = this.sort;
          this.ds.paginator = this.paginator;
        }, err => { 
          this.alertService.error('Language ' + language.name + ' could not deleted. Reason: ' + err.error);
        });
  }
}
