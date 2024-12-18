import { Component, OnInit } from '@angular/core';
import { Annoucement } from '../annoucements.model';
import { AnnouncementService } from '../announcement.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.css'
})
export class AnnouncementDetailComponent implements OnInit {
  public announcement!: Annoucement;
  id!: string;
  nativeWindow: any;

  constructor(private announcementService: AnnouncementService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router
  ) {this.nativeWindow = windowRefService.getNativeWindow()}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      const announcement = this.announcementService.getAnnouncement(this.id);
      if (!announcement) {
        console.error(`Announcement with id ${this.id} not found.`);
        this.router.navigate(['/announcements']); // Redirect if not found
      } else {
        this.announcement = announcement;
      }
    });
  }

  

   onDelete() {
    this.announcementService.deleteAnnoucement(this.announcement);
    this.router.navigate(['/announcements'])
 }
}
