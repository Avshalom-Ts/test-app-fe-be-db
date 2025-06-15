import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';


export interface WelcomeData {
  message: string;
  databaseURL: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  API_BASE_URL = environment.PRODUCTION
    ? environment.API_BASE_URL
    : environment.API_BASE_URL || '/api';

  apiConnection = signal<WelcomeData | null>(null)

  constructor(private http: HttpClient) { }


  ngOnInit() {
    console.log("🚀 ~ NxWelcomeComponent ~ environment.production:", environment.PRODUCTION)
    console.log("🚀 ~ NxWelcomeComponent ~ API_BASE_URL:", this.API_BASE_URL)
    this.getData();
  }

  getData() {
    this.http.get<WelcomeData>(`${this.API_BASE_URL}`).subscribe((response) => {
      console.log("🚀 ~ HomeComponent ~ this.http.get<WelcomeData> ~ response:", response)
      this.apiConnection.set(response);
    });
  }
}
