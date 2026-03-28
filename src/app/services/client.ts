import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('assets/client.json');
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('assets/transaction.json');
  }
}
