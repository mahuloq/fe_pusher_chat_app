import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './message.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((messages: any) => {
      this.messages = messages;
    });

    this.messageService.subscribeToNewMessages((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    this.messageService
      .sendMessage(this.newMessage)
      .subscribe((message: any) => {
        if (!this.messages.find((m: any) => m.id === message.id)) {
          this.messages.push(message);
        }
        this.newMessage = '';
      });
  }
}
