import { Component, OnInit } from '@angular/core';
import { Annoucement } from './annoucements.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit {
  selectedAnnouncement!: Annoucement;

  ngOnInit(): void {
      
  }

}
