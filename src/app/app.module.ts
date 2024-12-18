import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { MatchDetailComponent } from './matches/match-detail/match-detail.component';
import { MatchItemComponent } from './matches/match-item/match-item.component';
import { MatchEditComponent } from './matches/match-edit/match-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberItemComponent } from './members/member-item/member-item.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AnnouncementDetailComponent } from './announcements/announcement-detail/announcement-detail.component';
import { AnnouncementItemComponent } from './announcements/announcement-item/announcement-item.component';
import { AnnouncementListComponent } from './announcements/announcement-list/announcement-list.component';
import { AnnouncementEditComponent } from './announcements/announcement-edit/announcement-edit.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersComponent,
    AnnouncementsComponent,
    MatchesComponent,
    AnnouncementDetailComponent,
    MatchListComponent,
    MatchDetailComponent,
    MatchItemComponent,
    MatchEditComponent,
    MemberDetailComponent,
    MemberItemComponent,
    MemberListComponent,
    MemberEditComponent,
    AnnouncementItemComponent,
    AnnouncementListComponent,
    AnnouncementEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
