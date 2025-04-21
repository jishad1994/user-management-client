import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  imagePreview: string = '';
  selectedFile!: File;
  user: any = {};
  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.profileForm = this.fb.group({
      username: [''],
    });
  }

  loadProfile() {
    const token = this.auth.getToken();
    this.http
      .get('http://localhost:5000/api/user/profile', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .subscribe((user: any) => {
        this.user = user;
        this.profileForm.patchValue({ username: user.username });
        this.imagePreview = user.profileImage
          ? `http://localhost:5000/${user.profileImage}`
          : '';
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.profileForm.value.username || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    const token = this.auth.getToken();
    this.http
      .put('http://localhost:5000/api/user/profile', formData, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .subscribe({
        next: (res) => {
          alert('Profile updated successfully');
          this.loadProfile(); // reload updated data
        },
        error: (err) => alert('Update failed: ' + err.error.message),
      });
  }
}
