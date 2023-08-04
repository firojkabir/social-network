import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isLoggedIn = false;

  siteLanguage: any = 'English';
  siteLocale: any;
  //   languageList = [
  //     { code: 'en-US', label: 'English' },
  //     { code: 'de-DE', label: 'Deutsch' },
  //     { code: 'es-PR', label: 'Spanish' },
  //   ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      },
    });
  }

  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];
    // this.siteLanguage = this.languageList.find(
    //   (f) => f.code === this.siteLocale
    // )?.label;
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['login']);
  };

  setDefaultLanguage = (language: string) => {
    this.translateService.setDefaultLang(language);
    localStorage.setItem('language', language);
  };
}
