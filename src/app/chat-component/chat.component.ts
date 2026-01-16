import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  userInput: string = '';
  response: string = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.isLoading = true;

    const payload = {
      prompt: this.userInput
    };

    this.http.post<any>('http://localhost:3000/api/chat', payload)
      .subscribe({
        next: (res) => {
          this.response = res.message;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.response = 'Error communicating with server';
          this.isLoading = false;
        }
      });
  }
}
