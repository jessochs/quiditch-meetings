import { Component, Input } from '@angular/core';
import { Annoucement } from '../annoucements.model';

@Component({
  selector: 'app-announcement-item',
  templateUrl: './announcement-item.component.html',
  styleUrl: './announcement-item.component.css'
})
export class AnnouncementItemComponent {
  @Input() announcement!: Annoucement;

}
