import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Annoucement } from '../annoucements.model';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrl: './announcement-edit.component.css'
})
export class AnnouncementEditComponent implements OnInit {
  @ViewChild('f', {static: false}) deForm!: NgForm;
  subscription: Subscription = new Subscription();
  
  originalAnnouncement!: Annoucement;
  announcement!: Annoucement;
  editMode: boolean = false;
  id!: string;

  constructor(private announcementService: AnnouncementService,
              private router: Router,
              private route: ActivatedRoute
  ){}

  onCancel() {
    this.router.navigate(['/announcements'], {relativeTo: this.route})
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
  
      if (!this.id) {
        this.editMode = false;
        return;
      }
  
      const result = this.announcementService.getAnnouncement(this.id);
      if (result) {
        this.originalAnnouncement = result;
        this.announcement = JSON.parse(JSON.stringify(this.originalAnnouncement));
        this.editMode = true;
      } else {
        console.error(`Announcement with ID ${this.id} not found.`);
        this.editMode = false;
      }
    });
  }
  
  

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAnnouncement = new Annoucement(this.id || '', value.name, value.description);

    if (this.editMode === true) {
      this.announcementService.updateAnnouncement(this.originalAnnouncement, newAnnouncement);

    } else {
      this.announcementService.addAnnoucement(newAnnouncement)
    }
    this.router.navigate(['/announcements'], {relativeTo: this.route})


  }

}
