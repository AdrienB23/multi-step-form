import { Component, HostListener, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TextService } from './shared/services/text.service';
import { unflattenText } from './shared/utils/helper';
import { PlanService } from './shared/services/plan.service';
import { AddOnsService } from './shared/services/add-ons.service';
import { PageData } from './shared/models/page-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'multi-step-form';
  texts!: {[p: string]: any};
  data!: PageData;
  screenWidth!: number;
  navItems!: string[];

  constructor(
    private textService : TextService,
    private planService: PlanService,
    private addOnsService: AddOnsService,
  ) {
  }

  ngOnInit() {
    this.getTexts();
    this.getDatas();
  }

  getTexts() {
    this.textService.getAllTextsFromDB().subscribe({
      next: data => {
        this.texts = unflattenText(data);
        this.afterTextsLoaded();
        console.log(this.texts);
      },
      error: () => {
        console.warn("Backend inaccessible, chargement des textes depuis le fichier");
        this.textService.getAllTextsFromFile().subscribe({
          next: fileData => {
            this.texts = fileData;
            this.afterTextsLoaded();
          },
          error: () => {
            console.error("Impossible de charger les textes depuis le fichier.");
          }
        });
      }
    });
  }

  getDatas() {
    forkJoin({
      plans: this.planService.getPlans(),
      addOns: this.addOnsService.getAddOns()
    }).subscribe({
      next: result => {
        if (result.plans.length && result.addOns.length) {
          this.data = result;
        } else {
          console.warn("Chargement partiel ou vide, lecture du fichier de secours");
          this.loadDataFromFile();
        }
      },
      error: () => {
        console.warn("Échec du chargement des données, lecture du fichier de secours");
        this.loadDataFromFile();
      }
    });
  }

  loadDataFromFile() {
    forkJoin({
      plans: this.planService.getPlansFromFile(),
      addOns: this.addOnsService.getAddOnsFromFile()
    }).subscribe({
      next: fileData => {
        this.data = {
          plans: fileData.plans,
          addOns: fileData.addOns,
        };
      },
      error: () => {
        console.error("Échec du chargement des données de secours");
      }
    });
  }

  afterTextsLoaded() {
    this.navItems = this.texts['header']['nav'] || [];
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }
}
