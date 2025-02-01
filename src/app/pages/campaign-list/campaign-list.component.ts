import {Component, Signal} from '@angular/core';
import {CampaignService} from '../../services/campaign.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {CampaignListItemComponent} from '../../components/campaign-list-item/campaign-list-item.component';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Campaign} from '../../types';

@Component({
  selector: 'app-campaign-list',
  imports: [
    CampaignListItemComponent,
    RouterLink,
    ButtonModule
  ],
  templateUrl: './campaign-list.component.html',
  standalone: true,
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent {

  campaigns: Signal<Campaign[] | undefined>;

  constructor(private campaignService: CampaignService) {
    this.campaigns = toSignal(this.campaignService.campaigns$);
    console.log(this.campaigns());
  }

}
