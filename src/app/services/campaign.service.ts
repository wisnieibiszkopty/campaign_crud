import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of, switchMap, throwError} from 'rxjs';
import {id} from '../utils';
import {Campaign} from '../types';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignSubject = new BehaviorSubject<Campaign[]>([]);

  campaigns$ = this.campaignSubject.asObservable();

  constructor() {
    this.listenForChange();
    this.init();
  }

  private init(){
    const mockedCampaigns: Campaign[] = [
      {
        id: 'X5B2D',
        name: 'Sustainable Fashion Campaign',
        keywords: ['sustainable', 'eco-friendly', 'premium quality'],
        bidAmount: 200,
        fund: 7000,
        status: true,
        town: 'London',
        radius: 40
      },
      {
        id: 'A9K3P',
        name: 'Organic Product Launch',
        keywords: ['organic', 'handmade', 'artisan crafted'],
        bidAmount: 180,
        fund: 4000,
        status: false,
        town: 'New York',
        radius: 30
      },
      {
        id: 'T4G8L',
        name: 'Innovative Design Promotion',
        keywords: ['innovative design', 'high performance', 'limited edition'],
        bidAmount: 250,
        fund: 9000,
        status: true,
        town: 'Berlin',
        radius: 60
      },
      {
        id: 'M2Q1X',
        name: 'Exclusive Production Ad',
        keywords: ['exclusive production', 'patented technology', 'durable'],
        bidAmount: 300,
        fund: 15000,
        status: true,
        town: 'Paris',
        radius: 45
      },
      {
        id: 'H7C9S',
        name: 'Customizable Product Sale',
        keywords: ['customizable', 'bulk production', 'high efficiency'],
        bidAmount: 350,
        fund: 12000,
        status: false,
        town: 'Tokyo',
        radius: 50
      }
    ];

    this.campaignSubject.next(mockedCampaigns);
  }

  private listenForChange(){
    this.campaigns$.subscribe(campaigns => {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    });
  }

  getById$(id: string): Observable<Campaign>{
    return this.campaigns$.pipe(
      switchMap(campaigns => {
        const campaign = campaigns.find(c => c.id === id);
        return campaign ?
          of(campaign) :
          throwError(() => new Error(`Campaign with id: ${id} doesn't exists`));
      })
    );
  }

  add(campaign: Campaign): string {
    campaign.id = id();
    const currentCampaigns = this.campaignSubject.value;
    currentCampaigns.push(campaign);
    this.campaignSubject.next(currentCampaigns);

    return campaign.id;
  }

  edit(campaign: Campaign){
    let currentCampaigns = this.campaignSubject.value;
    currentCampaigns = currentCampaigns.map(c => {
      if(c.id === campaign.id){
        return { ...c, ...campaign }
      } else return c;
    });

    this.campaignSubject.next(currentCampaigns);
  }

  delete(id: string) {
    const campaigns = this.campaignSubject.value;
    const campaignIndex = campaigns.findIndex(c => c.id === id);

    if (campaignIndex !== -1) {
      campaigns.splice(campaignIndex, 1);
      this.campaignSubject.next([...campaigns]);
    } else {
      throw new Error(`Cannot find campaign with id: ${id}.`);
    }
  }
}
