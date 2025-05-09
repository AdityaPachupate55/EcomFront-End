import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from "../../layout/header/header.component";

// Define User and Address interfaces
interface User {
  userId: number;
  name: string;
  phone: string;
  email: string;
}

interface Address {
  addressId: number;
  userId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
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
    city: '',
    postalCode: '',
    state: '',
    country: ''
  };

  addresses: Address[] = []; // Store all addresses here
  private userApiUrl = 'https://localhost:7194/api/User'; // Replace with your User API endpoint
  private addressApiUrl = 'https://localhost:7194/api/Address/user'; // Replace with your Address API endpoint
  private addressRegisterApiUrl = 'https://localhost:7194/api/Address'; // API endpoint for registering a new address
  private addressUpdateApiUrl = 'https://localhost:7194/api/Address'; // API endpoint for updating an address

  private selectedAddressId: number = 0;
  private userId: string = ''; // Placeholder for userId, initialized in ngOnInit
  isAddAddressModalVisible = false; // Modal visibility state

  newAddress = {
    userId: 0,
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    state: '',
    country: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.userDetails.id; // Initialize userId after authService is available
    this.newAddress.userId = parseInt(this.userId, 10); // Automatically assign userId for new address
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
      index = eventOrIndex;
    } else {
      const selectElement = eventOrIndex.target as HTMLSelectElement;
      index = parseInt(selectElement.value, 10);
    }

    if (index >= 0 && index < this.addresses.length) {
      const address = this.addresses[index];
      this.selectedAddressId = address.addressId;
      this.profile.addressLine1 = address.addressLine1;
      this.profile.addressLine2 = address.addressLine2;
      this.profile.city = address.city;
      this.profile.postalCode = address.postalCode;
      this.profile.state = address.state;
      this.profile.country = address.country;
    }
  }

  // Handle form submission for updating an address
  onUpdateProfile(): void {
    const updatedAddress = {
      addressId: this.selectedAddressId,
      userId: parseInt(this.userId, 10),
      addressLine1: this.profile.addressLine1,
      addressLine2: this.profile.addressLine2,
      city: this.profile.city,
      state: this.profile.state,
      postalCode: this.profile.postalCode,
      country: this.profile.country
    };

    this.http.put(`${this.addressUpdateApiUrl}/${updatedAddress.addressId}`, updatedAddress).subscribe({
      next: (response) => {
        console.log('Address updated successfully:', response);
        alert('Address updated successfully!');
      },
      error: (error) => {
        console.error('Error updating address:', error);
        alert('Failed to update address. Please try again.');
      }
    });
  }

  // Show the modal for adding a new address
  showAddAddressForm(): void {
    this.isAddAddressModalVisible = true;
  }

  // Hide the modal for adding a new address
  hideAddAddressForm(): void {
    this.isAddAddressModalVisible = false;
  }

  // Handle form submission for adding a new address
  onSubmitNewAddress(): void {
    this.http.post(this.addressRegisterApiUrl, this.newAddress).subscribe({
      next: (response) => {
        console.log('New address added successfully:', response);
        alert('New address added successfully!');
        this.hideAddAddressForm();
        this.fetchUserProfile(); // Refresh the address list
      },
      error: (error) => {
        console.error('Error adding new address:', error);
        alert('Failed to add new address. Please try again.');
      }
    });
  }
}
