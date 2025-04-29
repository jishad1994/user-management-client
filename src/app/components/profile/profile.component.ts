import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { select, Store } from '@ngrx/store';
import {
  AppState,
  selectProfilePic,
  selectError,
  selectUser,
} from '../../store/auth/auth.selectors';
import { uploadProfileImage, logout } from '../../store/auth/auth.actions';
import { AlertService } from '../../services/alert.service';

//interface for user object recieving
interface User {
  username?: string;
  email?: string;
  profileImage?: string;
  phone?: string;
}
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  selectedFile: File | null = null;
  user: User = {};
  profilePic = '';
  apiUrl = environment.apiUrl;
  profileImageUrl$!: Observable<string | undefined>;
  private store = inject(Store<AppState>);
  user$ = this.store.select(selectUser);

  private selectError$ = this.store.select(selectError);
  private alertService = inject(AlertService);
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.getUserData();
    this.profileImageUrl$ = this.store.select(selectProfilePic).pipe(
      map((url) => {
        if (url) {
          return `${environment.apiUrl}/${url.replace(/\\/g, '/')}`;
        } else if (this.user?.profileImage) {
          return `${environment.apiUrl}/${this.user.profileImage.replace(/\\/g, '/')}`;
        }
        return undefined;
      })
    );

    //shoow errors if any while uploading
    this.selectError$.subscribe((errorMessage) => {
      if (errorMessage) {
        this.alertService.error(errorMessage);
      }
    });

    //get user details from the
    this.getUserData();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile);

      this.store.dispatch(uploadProfileImage({ formData: formData }));
    }
  }
  getUserData() {
    this.authService.getProfile().subscribe({
      next: (user: User) => {
        console.log(user);
        user.profileImage = user.profileImage?.replace(/\\/g, '/');
        this.user = user;
      },
      error: (err) => {
        alert('failed to upload profile image');
      },
    });
  }

  logout() {
    console.log('logout done');
    this.store.dispatch(logout());
  }
}
