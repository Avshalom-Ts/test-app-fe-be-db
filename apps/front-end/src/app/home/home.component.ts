import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


export interface Store {
  name: string;
  description: string;
}

export interface WelcomeData {
  message: string;
  databaseURL: string;
  hostname?: string;
  containerHostname?: string;
}

export interface HostnameInfo {
  hostname: string;
  containerHostname: string;
  platform: string;
  nodeVersion: string;
  dockerHost: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent implements OnInit {
  API_BASE_URL = environment.PRODUCTION
    ? environment.API_BASE_URL
    : environment.API_BASE_URL || '/api';

  apiConnection = signal<WelcomeData | null>(null)
  hostnameInfo = signal<HostnameInfo | null>(null)

  storeForm!: FormGroup;

  allStores = signal<Store[]>([]);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }


  ngOnInit() {
    console.log("🚀 ~ NxWelcomeComponent ~ environment.production:", environment.PRODUCTION)
    console.log("🚀 ~ NxWelcomeComponent ~ API_BASE_URL:", this.API_BASE_URL)
    this.getData();
    this.getHostnameInfo();

    this.storeForm = this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });
    this.getAllStores();
  }

  getData() {
    this.http.get<WelcomeData>(`${this.API_BASE_URL}`).subscribe((response) => {
      console.log("🚀 ~ HomeComponent ~ this.http.get<WelcomeData> ~ response:", response)
      this.apiConnection.set(response);
    });
  }

  getHostnameInfo() {
    this.http.get<HostnameInfo>(`${this.API_BASE_URL}/hostname`).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ getHostnameInfo ~ response:", response);
        this.hostnameInfo.set(response);
      },
      error: (error) => {
        console.error("🚀 ~ HomeComponent ~ getHostnameInfo ~ error:", error);
      }
    });
  }

  refreshServerInfo() {
    this.getData();
    this.getHostnameInfo();
  }

  onSubmit() {
    console.log("🚀 ~ HomeComponent ~ onSubmit ~ this.storeForm.value:", this.storeForm.value);
    this.http.post<Store>(`${this.API_BASE_URL}/store-name`, this.storeForm.value).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ onSubmit ~ response:", response);
        this.storeForm.reset();
        this.allStores.update((stores) => [...stores, response]);
      },
      error: (error) => {
        console.error("🚀 ~ HomeComponent ~ onSubmit ~ error:", error);
      }
    });
  }

  getAllStores() {
    this.http.get<Store[]>(`${this.API_BASE_URL}/store-name`).subscribe({
      next: (response) => {
        console.log("🚀 ~ HomeComponent ~ getAllStores ~ response:", response);
        this.allStores.set(response);
      },
      error: (error) => {
        console.error("🚀 ~ HomeComponent ~ getAllStores ~ error:", error);
      }
    });
  }
}
