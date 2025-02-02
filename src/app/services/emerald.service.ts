import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Account} from '../types';

@Injectable({
  providedIn: 'root'
})
export class EmeraldService {

  private accountSubject = new BehaviorSubject<Account | null>({
    funds: 100000
  });
  account$ = this.accountSubject.asObservable();

  constructor() {}

  validateFunds(amount: number): boolean{
    const funds = this.accountSubject.value?.funds!;
    return funds - amount > 0;
  }

  takeFunds(amount: number){
    const currentAccount = this.accountSubject.value;

    if (currentAccount === null) {
      throw new Error('No account found');
    }

    const funds = this.accountSubject.value?.funds!;
    const newFunds = funds - amount;

    if(amount < 0){
      throw new Error("Cannot take that amount");
    }

    this.accountSubject.next({
      ...currentAccount,
      funds: newFunds
    });

  }
}
