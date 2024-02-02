import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { LogupComponent } from './componentes/logup/logup.component';
import { MainComponent } from './componentes/main/main.component';
import { Session } from 'inspector';
import { sessionGuard } from './guards/session.guard';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'logup', component:LogupComponent},
    {path: 'main', component:MainComponent, canActivate: [sessionGuard]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
