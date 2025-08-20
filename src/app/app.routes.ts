import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { NotFound } from './not-found/not-found';
import { Admin } from './admin/admin';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { adminChildGuard } from './guards/admin-child-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { Books } from './books/books';
import { BookDetails } from './book-details/book-details';
import { AddBook } from './add-book/add-book';
import { UpdateBook } from './update-book/update-book';


export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch: "full"},
    {path:"home" , component: Home, title:"Home"},
    {path:"about", component: About, title:"About"},
    {path:"contact" , component: Contact, title:"Contact"},
    {path:"books" , component: Books,title:"Books"},
    {path:"login" , component: Login,title:"Login"},
    {path:"signup" , component: Signup, title:"Signup"},
    
    {path:"books/:id" , component: BookDetails, title:"Book Details"},
    {path:"admin" , component: Admin, title:"Admin", 
        canActivate:[authGuard],
        canActivateChild:[adminChildGuard],
        children: [
        {path:"", redirectTo: "dashboard", pathMatch: "full"},
        {path:"dashboard" , component: AdminDashboard, title:"Admin Dashboard"},
         {path:"addbook" , component: AddBook, title:"Add Book", canDeactivate:[unsavedChangesGuard]},
         {path:"updatebook/:id" , component: UpdateBook, title:"Update Book", canActivate:[authGuard]},
        
        ],
    },
    {path:"**" , component: NotFound, title:"Not Found"},
];
