import { Component, inject, WritableSignal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgForOf } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { firstValueFrom } from 'rxjs';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { AvatarUploadComponent } from '../settings-page/avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-profile-page',
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
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    PostFeedComponent,
    AvatarUploadComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );
}
