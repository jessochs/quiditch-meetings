import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementEditComponent } from './announcements/announcement-edit/announcement-edit.component';
import { AnnouncementDetailComponent } from './announcements/announcement-detail/announcement-detail.component';

const routes: Routes = [
  {path: 'announcements', component: AnnouncementsComponent, children: [
    {path: 'new', component: AnnouncementEditComponent},
    {path: ':id', component: AnnouncementDetailComponent},
    {path: ':id/edit', component: AnnouncementEditComponent}
  ]},
  {path: '', redirectTo: 'announcements', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
