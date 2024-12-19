import { ProfileService } from './../../data/services/profile.service';
import { AsyncPipe, JsonPipe, NgFor, NgForOf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SubscriberCardComponent,
    SvgIconComponent,
    NgForOf,
    NgFor,
    RouterLink,
    ImgUrlPipe,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chat',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
