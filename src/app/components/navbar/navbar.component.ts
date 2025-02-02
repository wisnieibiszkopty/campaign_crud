import {Component, Signal, ViewChild} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Router} from '@angular/router';
import {Dialog} from 'primeng/dialog';
import {toSignal} from '@angular/core/rxjs-interop';
import {EmeraldService} from '../../services/emerald.service';
import {Account} from '../../types';

@Component({
  selector: 'app-navbar',
  imports: [
    Menubar,
    Dialog
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  items: MenuItem[] = [
    {
      label: 'Campaigns',
      icon: 'pi pi-home',
      command: () => {
        this.router.navigate(['/']);
      }
    },
    {
      label: 'Create new',
      icon: 'pi pi-plus',
      command: () => {
        this.router.navigate(['/add']);
      }
    },
    {
      label: 'Emerald',
      icon: 'pi pi-user',
      command: () => {
        this.showDialog();
      }
    }
  ];

  account: Signal<Account | null | undefined>;

  constructor(private router: Router, private emeraldService: EmeraldService) {
    this.account = toSignal(this.emeraldService.account$);
  }

}
