import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'site-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isAuthenticated: boolean = false;
  userName: string | null = null;
  mobileMenuOpen: boolean = false;
  
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user?.token;
      this.userName = user?.email || null;
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}