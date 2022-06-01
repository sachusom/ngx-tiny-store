import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

const routes: Routes = [
    {
        path: '',
        component: UserRegistrationComponent
    },
    {
        path: 'users',
        component: UserListComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
