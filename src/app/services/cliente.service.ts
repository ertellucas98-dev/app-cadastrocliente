import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElementData } from '../views/home/home';


@Injectable()
export class ClienteService {
    private baseUrl = 'http://localhost:8080/clientes';
    private httpOptions = {
     headers: new HttpHeaders(
        
        { 'Content-Type': 'application/json' ,
        })
    };
   constructor(private http: HttpClient) { }

  // listar todos
  getElements(): Observable<ElementData[]> {
    return this.http.get<ElementData[]>(this.baseUrl);
  }

  // obter por id
  getElementById(id: number): Observable<ElementData> {
    return this.http.get<ElementData>(`${this.baseUrl}/${id}`);
  }

  // criar
  createElement(element: ElementData): Observable<ElementData> {
    return this.http.post<ElementData>(this.baseUrl, element, this.httpOptions);
  }

  // atualizar (por ID)
  updateElement(id: number, element: ElementData): Observable<ElementData> {
    return this.http.put<ElementData>(`${this.baseUrl}/${id}`, element, this.httpOptions);
  }

  // deletar (por ID)
  deleteElement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

