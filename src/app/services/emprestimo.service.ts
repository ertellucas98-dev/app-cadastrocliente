import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElementData } from '../views/home/home';


@Injectable()
export class EmprestimoService {
    private baseUrl = 'http://localhost:8080/emprestimos';
    private apiUrlMoedas = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json'
    private apiUrlCotacaoInicial = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27';
    private apiUrlCotacaoFinal = '%27&@dataInicial=%2711-21-2025%27&@dataFinalCotacao=%2711-28-2025%27&$format=json&top=%271%27&$orderby=dataHoraCotacao%20desc';
    private httpOptions = {
     headers: new HttpHeaders(
        
        { 'Content-Type': 'application/json' ,
        })
    };
   constructor(private http: HttpClient) { }

  // listar todos
    getMoedas(): Observable<any> {
        return this.http.get<any>(this.apiUrlMoedas);
    }

    getCotacao(moeda: string): Observable<any> {
        return this.http.get<any>(this.apiUrlCotacaoInicial + moeda + this.apiUrlCotacaoFinal);
    }



}
