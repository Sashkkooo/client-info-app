import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../services/client';
import { Client } from '../models/client.model';
import { Transaction } from '../models/transaction.model';
import { CLIENT_FORM_CONFIG, FormFieldConfig } from '../config/client-form.config';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';




type ClientMap = {
  [K in keyof Client]: Client[K];
};

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './client-info.html',
  styleUrl: './client-info.css'
})
export class ClientInfo implements OnInit {
  client: Client | null = null;
  transactions: Transaction[] = [];
  isReady = false;

  // ⭐ ТОВА Е КЛЮЧОВОТО ОПРАВЯНЕ
  CLIENT_FORM_CONFIG: FormFieldConfig[] = CLIENT_FORM_CONFIG;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let clientLoaded = false;
    let transactionsLoaded = false;

    this.clientService.getClients().subscribe(client => {
      this.client = client;
      clientLoaded = true;
      this.checkIfReady(clientLoaded, transactionsLoaded);
    });

    this.clientService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      transactionsLoaded = true;
      this.checkIfReady(clientLoaded, transactionsLoaded);
    });
  }

  checkIfReady(c: boolean, t: boolean) {
    if (c && t) this.isReady = true;
  }

  getValue<K extends keyof ClientMap>(key: K): ClientMap[K] | undefined {
    return this.client?.[key];
  }

  exportClientPDF() {
    const doc = new jsPDF();

    const fieldLabels: Record<keyof Client, string> = {
      name: "Name",
      secondName: "Second Name",
      email: "Email",
      phone: "Phone Number",
      address: "Address",
      city: "City",
      country: "Country",
      accountNumber: "Account Number",
      bankCard: "Bank Card"
    };

    doc.setFontSize(18);
    doc.text('Client Information', 14, 20);

    const clientData = Object.entries(this.client!).map(([key, value]) => [
      fieldLabels[key as keyof Client],
      String(value)
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: clientData,
      theme: 'grid',
      styles: { fontSize: 12, cellPadding: 3 },
      headStyles: { fillColor: [33, 150, 243] } // Material Blue
    });

    doc.save('client-info.pdf');
  }

}
