import { Routes } from '@angular/router';
import { ProjectCompetition } from './pages/project-competition/project-competition';
import { RegistrationForm } from './pages/registration-form/registration-form';

export const routes: Routes = [
    { path: 'project-competition', component: ProjectCompetition },
    { path: 'registration-form', component: RegistrationForm }
];
