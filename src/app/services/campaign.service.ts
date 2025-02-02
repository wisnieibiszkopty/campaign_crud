import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of, switchMap, throwError} from 'rxjs';
import {id, mockCampaigns} from '../utils';
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
    const mockedCampaigns: Campaign[] = mockCampaigns();
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
