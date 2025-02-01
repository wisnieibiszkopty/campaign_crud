import { Routes } from '@angular/router';
import {CampaignCreateComponent} from './pages/campaign-create/campaign-create.component';
import {CampaignDetailsComponent} from './pages/campaign-details/campaign-details.component';
import {CampaignListComponent} from './pages/campaign-list/campaign-list.component';

export const routes: Routes = [
  {path: '', component: CampaignListComponent},
  {path: 'add', component: CampaignCreateComponent},
  {path: 'edit', component: CampaignCreateComponent},
  {path: 'details/:id', component: CampaignDetailsComponent}
];
