import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from "../../layout/header/header.component";

// Define User and Address interfaces
interface User {
  name: string;
  phone: string;
  email: string;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  state: string;
  country: string;
}

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  profile = {
    name: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    state: '',
    country: ''
  };

  addresses: Address[] = []; // Store all addresses here

  private userApiUrl = 'https://localhost:7194/api/User'; // Replace with your User API endpoint
  private addressApiUrl = 'https://localhost:7194/api/Address/user'; // Replace with your Address API endpoint
  private userId: string = ''; // Placeholder for userId, initialized in ngOnInit

  constructor(private http: HttpClient , private authService : AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.userDetails.id; // Initialize userId after authService is available
    this.fetchUserProfile();
  }

  // Fetch user and address data
  fetchUserProfile(): void {
    // Fetch user data
    this.http.get<User>(`${this.userApiUrl}/${this.userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe({
      next: (userData) => {
        console.log('User API Response:', userData); // Debug log
        this.profile.name = userData.name;
        this.profile.phone = userData.phone;
        this.profile.email = userData.email;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });

    // Fetch address data
    this.http.get<Address[]>(`${this.addressApiUrl}/${this.userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe({
      next: (addressData) => {
        console.log('Address API Response:', addressData); // Debug log
        this.addresses = addressData; // Store all addresses
        if (this.addresses.length > 0) {
          this.setAddress(0); // Set the first address as default
        } else {
          console.warn('No address data found for the user.');
        }
      },
      error: (error) => {
        console.error('Error fetching address data:', error);
      }
    });
  }

  // Set a specific address by index
  setAddress(eventOrIndex: Event | number): void {
    let index: number;

    if (typeof eventOrIndex === 'number') {
      // If a number is passed, use it directly as the index
      index = eventOrIndex;
    } else {
      // If an Event is passed, extract the value from the select element
      const selectElement = eventOrIndex.target as HTMLSelectElement;
      index = parseInt(selectElement.value, 10);
    }

    // Validate the index and set the address
    if (index >= 0 && index < this.addresses.length) {
      const address = this.addresses[index];
      this.profile.addressLine1 = address.addressLine1;
      this.profile.addressLine2 = address.addressLine2;
      this.profile.postalCode = address.postalCode;
      this.profile.state = address.state;
      this.profile.country = address.country;
    } else {
      console.warn('Invalid address index:', index);
    }
  }


  // Handle form submission
  onUpdateProfile(): void {
    console.log('Updated Profile:', this.profile);
    // Add logic to send updated data to the backend
  }
}
