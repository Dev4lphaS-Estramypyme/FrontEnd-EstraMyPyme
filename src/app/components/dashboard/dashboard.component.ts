import { Component, Input, OnInit } from '@angular/core';
import { InfoSecComponent } from '../info-sec/info-sec.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoSecComponent, CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isModalVisible: boolean = false;
  user: User | null = null;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  goToTest(): void {
    if (this.user && this.user.isTestDone) {
      this.isModalVisible = true;
    } else {
      this.router.navigateByUrl("/dashboard/test");
    }
  }

  goToEstado(): void {
    this.router.navigateByUrl("/dashboard/estado-prueba");
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  goToTestModal(): void {
    this.router.navigateByUrl("/dashboard/test");
  }

  onBookDownload(event: Event): void {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    if (this.user) {
      this.http.put(`http://localhost:8080/api/usersCompanies/bookDownloaded/${this.user.email}`, {})
        .subscribe(
          response => {
            console.log('Book download status updated successfully');
            // Después de actualizar el estado, proceder con la descarga
            const link = document.createElement('a');
            link.href = 'assets/images/imgDasCompany/Libro_EstramyPyme_VERSI%C3%93N+DIGITAL_EditorialEAFIT%20(3).pdf';
            link.download = 'Libro_EstramyPyme.pdf';
            link.click();
          },
          error => {
            console.error('Error updating book download status', error);
          }
        );
    }
  }
}