import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService:UiService, private router:Router) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  toggleAddTask() {
    // When I click add btn, call the function (ui.service.ts)
    this.uiService.toggleAddTask();
  }

  hasRouter(route: string) {
    return this.router.url === route;
  }
}
