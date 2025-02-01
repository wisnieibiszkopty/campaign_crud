import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CampaignCreateComponent} from './pages/campaign-create/campaign-create.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {Message} from 'primeng/message';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CampaignCreateComponent, NavbarComponent, Message, Toast],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'campaign-crud';
}
