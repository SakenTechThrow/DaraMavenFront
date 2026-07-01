import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile';
import { Profile as UserProfile } from '../../models/profile';
import { getErrorMessage } from '../../core/utils/error-message';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  profile: UserProfile | null = null;

  firstName = '';
  lastName = '';
  phone = '';
  city = '';
  birthDate = '';
  bio = '';

  loading = true;
  saving = false;
  deleting = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private profileService: ProfileService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadProfile();  
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.getMyProfile().subscribe({
      next: (response) => {
        this.profile = response;

        this.firstName = response.firstName ?? '';
        this.lastName = response.lastName ?? '';
        this.phone = response.phone ?? '';
        this.city = response.city ?? '';
        this.birthDate = response.birthDate ?? '';
        this.bio = response.bio ?? '';

        this.loading = false;
      },
      error: () =>{
        this.profile = null;
        this.loading = false;
      }
    });
  }

  saveProfile(): void{
      this.errorMessage = '';
      this.successMessage = '';
      this.saving = true;

      const request = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        city: this.city,
        birthDate: this.birthDate,
        bio: this.bio
      };
      if(this.profile){
        this.profileService.updateMyProfile(request).subscribe({
          next: (response) =>{
            this.profile = response;
            this.saving = false;
            this.successMessage = 'Profile updated successfully';
          },
          error:(error) =>{
            this.saving = false;
            this.errorMessage = getErrorMessage(error, 'Could not update profile');
          }
        });
      } else{
        this.profileService.createMyProfile(request).subscribe({
          next: (response) =>{
            this.profile = response;
            this.saving = false;
            this.successMessage = 'Profile created successfully';
          },
          error:(error)=>{
            this.saving = false;
            this.errorMessage = getErrorMessage(error, 'Could not create profile');
          }
        });
      }
  }
  deleteProfile(): void {
    const confirmed = confirm('Are you sure you want to delete your profile?');

    if(!confirmed){
      return;
    }
    this.deleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.deleteMyProfile().subscribe({
      next:()=>{
        this.profile = null;

        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.city = '';
        this.birthDate = '';
        this.bio = '';

        this.deleting = false;
        this.successMessage = 'Profile deleted successfully';
      },
      error:(error)=>{
        this.deleting = false;
        this.errorMessage = getErrorMessage(error, 'Could not delete profile');
      }
    });
  }

  goBack(): void{
    this.router.navigate(['/dashboard']);
  }
}
