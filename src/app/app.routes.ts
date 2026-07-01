import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { authGuard } from './core/guards/auth-guard';
import { Sessions } from './pages/sessions/sessions';
import { AdminUsers } from './pages/admin-users/admin-users';
import { AdminAuditLogs } from './pages/admin-audit-logs/admin-audit-logs';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [authGuard]
    },
    {
        path: 'sessions',
        component: Sessions,
        canActivate: [authGuard]
    },
    {
        path: 'admin/users',
        component: AdminUsers,
        canActivate: [authGuard]
    },
    {
        path:  'admin/audit-logs',
        component: AdminAuditLogs,
        canActivate: [authGuard]
    }
];
