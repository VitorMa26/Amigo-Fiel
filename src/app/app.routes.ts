import { Routes } from '@angular/router';
import { Login} from "./pages/login/login"
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { PetForm } from './pages/admin/pet-form/pet-form';
import { PetList } from './pages/pet-list/pet-list';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "login", component: Login},
    {path: "home", component:PetList},
    {

         path: "admin", children: [//admin
            {path: "dashboard", component: Dashboard}, //admin/planos
            { path: "petForm", component: PetForm} //admin/planos
         ]
        
        }
];
