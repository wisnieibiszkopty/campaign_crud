import {Component, Input, Signal, signal} from '@angular/core';
import {CampaignService} from '../../services/campaign.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Fluid} from 'primeng/fluid';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {NgIf} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {EmeraldService} from '../../services/emerald.service';
import {Account, Campaign} from '../../types';
import {MessageService} from 'primeng/api';
import {getCities, getKeywords} from '../../utils';

export interface City {
  name: string;
}

@Component({
  selector: 'app-campaign-create',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputNumber,
    Fluid,
    ToggleSwitch,
    Select,
    Button,
    AutoComplete,
    NgIf,
  ],
  templateUrl: './campaign-create.component.html',
  standalone: true,
  styleUrl: './campaign-create.component.css'
})
export class CampaignCreateComponent {

  campaign?: Campaign;
  editing = signal(false);

  account: Signal<Account | null | undefined>;

  keywordsList: string[] = getKeywords();
  cities: City[] = getCities();

  suggestions: any[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    keywords: new FormArray([
      new FormControl('', [Validators.required, this.valueFromListValidator(this.keywordsList)])
    ]),
    bidAmount: new FormControl(100, [Validators.required, Validators.min(100), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    fund: new FormControl(100, [Validators.required, Validators.min(100), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    status: new FormControl(false, Validators.required),
    town: new FormControl('', Validators.required),
    radius: new FormControl(10, [Validators.required, Validators.min(10), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])
  });

  constructor(private fb: FormBuilder,
              private campaignService: CampaignService,
              private router: Router,
              private route: ActivatedRoute,
              private emeraldService: EmeraldService,
              private messageService: MessageService) {
    this.account = toSignal(this.emeraldService.account$);

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.campaign = navigation.extras.state['campaign'] ?? null;
      console.log(this.campaign);

      if(this.campaign){
        this.populateForm(this.campaign);
        this.editing.set(true);
      }

    }
  }

  private populateForm(campaign: Campaign): void {
    this.form.patchValue({
      name: campaign.name,
      bidAmount: campaign.bidAmount,
      fund: campaign.fund,
      status: campaign.status,
      town: campaign.town,
      radius: campaign.radius
    });

    if (campaign.keywords) {
      const keywords = this.form.get('keywords') as FormArray;
      keywords.clear();
      campaign.keywords.forEach(keyword => {
        keywords.push(this.fb.control(keyword, [Validators.required, this.valueFromListValidator(this.keywordsList)]));
      });
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.suggestions = this.keywordsList
      .filter(name => name.toLowerCase().startsWith(query));
  }

  get keywords(): FormArray {
    return this.form.get('keywords') as FormArray;
  }

  addKeyword() {
    const newItem = this.fb.control('', Validators.required);
    this.keywords.push(newItem);
  }

  removeKeyword(index: number) {
    this.keywords.removeAt(index);
  }

  onSubmit(){
    const formValue = this.form.value;
    let campaign: Campaign = {
      bidAmount: formValue.bidAmount ?? 0,
      fund: formValue.fund ?? 0,
      keywords: formValue.keywords ? formValue.keywords.map(k => k ?? '') : [],
      name: formValue.name ?? '',
      radius: formValue.radius ?? 0,
      status: formValue.status ?? false,
      // @ts-ignore
      town: formValue.town.name ?? ''
    };

    if(this.editing()){
      campaign.id = this.campaign?.id;
      this.campaignService.edit(campaign);
      this.messageService.add({ severity: 'info', summary: 'Edited', detail: 'Campaign has been edited' });
      this.router.navigate([`/details/${this.campaign?.id}`]);
    } else {
      this.emeraldService.takeFunds(campaign.fund);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new campaign!' });
      const id = this.campaignService.add(campaign);
      this.router.navigate([`/details/${id}`])
    }
  }

  private valueFromListValidator(allowedValues: string[]): ValidatorFn {
    return (control: AbstractControl) => {
      return allowedValues.includes(control.value) ? null : { invalidValue: true };
    };
  }
}
