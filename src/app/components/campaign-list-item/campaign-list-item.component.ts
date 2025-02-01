import {Component, input, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Tag} from 'primeng/tag';
import {Campaign} from '../../types';

@Component({
  selector: 'app-campaign-list-item',
  imports: [
    Card,
    Tag
  ],
  templateUrl: './campaign-list-item.component.html',
  standalone: true,
  styleUrl: './campaign-list-item.component.css'
})
export class CampaignListItemComponent {
  campaign = input.required<Campaign>();
}
