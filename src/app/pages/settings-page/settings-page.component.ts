import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { Component, effect, inject, WritableSignal } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgForOf } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { firstValueFrom } from 'rxjs';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    descriprion: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched()  
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack)
      }))
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
