import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  dataSource: MatTableDataSource<Client>;
  displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'date_event', 'montant', 'niveau_recommandation', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Client>([]);
  }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients() {
    this.clientService.getClientList().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.clients.forEach(client => {
          if (client.date_event) {
            client.dateFormatted = this.formatDate(client.date_event);
          } else {
            client.dateFormatted = 'Date non définie';
          }
        });
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US'); // Formatage de la date au format 'yyyy-MM-dd'
  }

  clientDetails(_id: string) {
    this.router.navigate(['/admin/client-details', _id]);
  }

  deleteClient(_id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment supprimer ce client ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.clientService.deleteClient(_id).subscribe(
          () => {
            console.log('Client supprimé avec succès');
            this.getClients(); // Mettez à jour la liste après la suppression réussie
          },
          (error) => {
            if (error.status === 200) {
              console.log('Client supprimé avec succès');
              this.getClients(); // Mettez à jour la liste après la suppression réussie
            } else {
              console.error('Une erreur s\'est produite lors de la suppression du client:', error);
            }
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
