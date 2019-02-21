import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

const url = 'http://192.168.1.164:3000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  listener: DataListener;

  constructor(private http: HttpClient) {
    let socket = io(url);

    socket.on('data', (data) =>{
      this.listener.onData(data);
    });
  }

  public getData() : Observable<any>{
    return this.http.get(url + '/api/data');
  }
}

export interface DataListener{
  onData(data: any);
}
