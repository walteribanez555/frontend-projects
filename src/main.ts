import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/presentation/app.component';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngxs/store';
import { environment } from './environments/environment.development';
import { AppRoutingModule } from './app/presentation/app-routing.module';
import { ProjectState } from './app/application/states/project/project.state';
import { ProjectRepository } from './app/domain/repositories/project.repository';
import { ProjectService } from './app/data/api/project.service';

if (environment.production) {
  enableProdMode();
  //show this warning only on prod mode
  if (window) {
    selfXSSWarning();
  }
}

//Works Fine


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideHttpClient(),
    {
      provide : ProjectRepository,
      useClass : ProjectService,
    },
    provideStore([
      ProjectState,
    ]),

  ],
}).catch((err) => console.error(err));

function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      '%c** STOP **',
      'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding-left: 15px; padding-right: 15px; border-radius: 25px; padding-top: 5px; padding-bottom: 5px;'
    );
    console.log(
      `\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information sing an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
      'font-weight:bold; font: 2em Arial; color: #e11d48;'
    );
  });
}
