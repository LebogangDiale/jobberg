import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { AboutComponent } from './components/about/about.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCandidateComponent } from './components/view-candidate/view-candidate.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CandidateresultsComponent } from './components/candidateresults/candidateresults.component';
import { RecruiterDasboardComponent } from './components/recruiter-dasboard/recruiter-dasboard.component';
import { CandidatefavsComponent } from './components/candidatefavs/candidatefavs.component';
import { UpdateComponent } from './components/update/update.component';
import { DeactivateAccountComponent } from './components/deactivate-account/deactivate-account.component';
import { RealLoginComponent } from './components/real-login/real-login.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: CandidateProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recruiter', component: RecruiterRegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomePageComponent },
  { path: 'candidate/:id', component: ViewCandidateComponent },
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'recruiter-Dash', component: RecruiterDasboardComponent},
  { path: 'update', component: UpdateComponent},
  { path: 'deactivate', component: DeactivateAccountComponent},
  { path: 'results', component: CandidateresultsComponent },
  { path: 'wishlist', component: CandidatefavsComponent},
  { path: 'user-login', component: RealLoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
