import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { AboutComponent } from './components/about/about.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CandidateresultsComponent } from './components/candidateresults/candidateresults.component';
import { SearchcomponentComponent } from './components/searchcomponent/searchcomponent.component';
import { CandidatefavsComponent } from './components/candidatefavs/candidatefavs.component';
import { ViewCandidateComponent } from './components/view-candidate/view-candidate.component';
import { RouterModule } from '@angular/router';
import { DeactivateAccountComponent } from './components/deactivate-account/deactivate-account.component';
import { UpdateComponent } from './components/update/update.component';
import { RealLoginComponent } from './components/real-login/real-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecruiterDasboardComponent } from './components/recruiter-dasboard/recruiter-dasboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfilecandidateComponent } from './profilecandidate/profilecandidate.component';

import { FilterByLocationPipe } from './pipes/filter-by-location.pipe'
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { FilterByCulturePipe } from './pipes/filter-by-culture.pipe';

// import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CandidateProfileComponent,
    AboutComponent,
    RecruiterRegistrationComponent,
    AdminComponent,
    HomePageComponent,
    CandidateresultsComponent,
    SearchcomponentComponent,
    CandidatefavsComponent,
    ViewCandidateComponent,
    DeactivateAccountComponent,
    UpdateComponent,
    RecruiterDasboardComponent,
    RealLoginComponent,
    NavbarComponent,
    RecruiterDasboardComponent,
    ProfilecandidateComponent,
    FilterByLocationPipe,
    FilterPipe,
    ForgotPasswordComponent,
    FilterByCulturePipe,
    

    
   
    
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule,
    NgxPaginationModule,
    NgxPageScrollCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
