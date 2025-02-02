import {Component, OnInit, signal, Signal} from '@angular/core';
import {CampaignService} from '../../services/campaign.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, of} from 'rxjs';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Campaign} from '../../types';


@Component({
  selector: 'app-campaign-details',
  imports: [
    Tag,
    Button,
    ConfirmDialog,
  ],
  templateUrl: './campaign-details.component.html',
  standalone: true,
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent{

  campaign: Signal<Campaign | null>;

  errorMessage = signal('');

  constructor(private campaignService: CampaignService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    // CampaignDetails can be only access by details/id route,
    // so I assume that id is never null
    const id = this.route.snapshot.paramMap.get('id')!;

    this.campaign = toSignal<Campaign | null>(
      this.campaignService.getById$(id).pipe(
        catchError(err => {
          this.errorMessage.set(err.message);
          this.router.navigate(['/']);
          return of(null);
        })
      ),
      {initialValue: null}
    );
  }

  edit() {
    this.router.navigate(['/edit'], { state: {
      campaign: { ...this.campaign(), id: this.route.snapshot.paramMap.get('id')! } }
    });
  }

  confirmDelete(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this campaign?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Campaigned has been deleted' });
        this.delete(this.campaign()?.id!);
      },
      reject: () => {}
    });
  }

  delete(id: string){
    try{
      this.campaignService.delete(id);
      this.router.navigate(['/']);
    } catch (err: any){
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: err.message });
    }
  }

}
