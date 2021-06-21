import { UserNameExtrPipe } from './shared/pipes/user-name-extr.pipe';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SnackbarService } from './shared/service/snackbar.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAccountService } from './shared/service/user-account.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFirstLetterPipe } from './shared/pipes/user-first-letter.pipe';
import { DropdownUserMenuComponent } from './dropdown-user-menu/dropdown-user-menu.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCmsService } from './shared/service/admin-cms.service';
import { TableComponent } from './table/table.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    SnackbarComponent,
    UserProfileComponent,
    UserNameExtrPipe,
    UserFirstLetterPipe,
    DropdownUserMenuComponent,
    AdminComponent,
    TableComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserAccountService,
    SnackbarService,
    AdminCmsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
