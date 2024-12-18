import { Component, OnDestroy, OnInit } from '@angular/core';
import { Annoucement } from '../annoucements.model';
import { AnnouncementService } from '../announcement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css'
})
export class AnnouncementListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  announcementsList: Annoucement[] = [];
  announcementId: string = '';

  constructor(private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
      this.subscription = this.announcementService.getAnnouncements()
      .subscribe((announcements: Annoucement[]) => {
        this.announcementsList = announcements;
      })
  };

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


}
