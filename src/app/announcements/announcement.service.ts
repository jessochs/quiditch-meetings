import { Injectable } from '@angular/core';
import { Annoucement } from './annoucements.model';
import { MOCKANNOUNCEMENTS } from './MOCKANNOUNCEMENTS';
import { Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementListChangedEvent = new Subject<Annoucement[]>();
  startedEditing = new Subject<number>;

  private annoucements: Annoucement[] = [];
  private maxAnnouncementId: number;

  constructor(private http: HttpClient) {
    this.annoucements = MOCKANNOUNCEMENTS;
    this.maxAnnouncementId = this.getMaxId();
   }

   getMaxId(): number {
    let maxId = 0;
    for (const announcement of this.annoucements) {
      const currentId = parseInt(announcement.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  

   addAnnoucement(newAnnoucement: Annoucement){
    if (!newAnnoucement){
      return;
    } 

    this.maxAnnouncementId++;
    newAnnoucement.id = this.maxAnnouncementId.toString();
    this.annoucements.push(newAnnoucement);

    const documentsListClone = this.annoucements.slice();
    this.storeAnnouncements();

   }

   updateAnnouncement(originalAnnouncement: Annoucement, newAnnoucement: Annoucement){

    if(!originalAnnouncement || !newAnnoucement) {
      return;
    }

    const pos = this.annoucements.indexOf(originalAnnouncement)
    if (pos < 0) {
      return;
    }
    newAnnoucement.id = originalAnnouncement.id
    this.annoucements[pos] = newAnnoucement;
    // const documentsListClone = this.documents.slice();
    this.storeAnnouncements();

   }

   deleteAnnoucement(announcement: Annoucement){
    if (!announcement) {
      return;
    }
    const pos = this.annoucements.indexOf(announcement)

    if (pos < 0) {
      return;
    }
    this.annoucements.slice(pos, 1);
    const announcementsListClone = this.annoucements.slice();
    this.storeAnnouncements();
   }

   getAnnouncements(){
    return this.http.get<Annoucement[]>('https://quiditch-meetings-default-rtdb.firebaseio.com/announcements.json')
    .pipe(
      tap((annoucements: Annoucement[]) => {
        this.annoucements = annoucements || [];
        this.maxAnnouncementId = this.getMaxId();

        this.annoucements.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }

          if (a.name > b.name) {
            return 1
          }

          return 0;
        });
      

        this.announcementListChangedEvent.next(this.annoucements.slice());
      },

      (error: any) => {
        console.error('An Error has occured: ', error);
      })
      );   
   }
   getAnnouncement(id: string): Annoucement | null {
    for (let announcement of this.annoucements) {
      if (announcement.id === id) {
        return announcement;
      }
    }
    console.warn(`Announcement with ID ${id} not found in announcements.`);
    return null;
  }
  

   storeAnnouncements() {
    const announcementsString = JSON.stringify(this.annoucements);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://quiditch-meetings-default-rtdb.firebaseio.com/announcements.json', announcementsString, {headers})
    .subscribe(() => {
      this.announcementListChangedEvent.next(this.annoucements.slice());
    });
   }

   
  

}
