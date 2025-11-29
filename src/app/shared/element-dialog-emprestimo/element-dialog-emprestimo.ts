import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ElementData } from '../../views/home/home';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { EmprestimoService } from '../../services/emprestimo.service';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-element-dialog-emprestimo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './element-dialog-emprestimo.html',
  styleUrls: ['./element-dialog-emprestimo.css'],
  providers: [EmprestimoService] // <— CORREÇÃO
})
export class ElementDialogEmprestimo {
  ischange = false;
  taxaDeCotacaoData:  TaxaDeCotacaoMoedaData[] = [];
  moedas  : MoedaData[] = [];
  taxaDeCotacao: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:  ElementData ,
    public dialogRef: MatDialogRef<ElementDialogEmprestimo>,
    private emprestimoService: EmprestimoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
this.emprestimoService.getMoedas().subscribe({
    next: (response) => {
      this.moedas = response.value;
      this.cdr.detectChanges();
      
      // o OData retorna sempre dentro de "value"
    },
    error: (err) => console.error(err)
  });

     if(this.moedas.length > 0){
      this.exibirTaxaDeCotacao();
     }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  exibirTaxaDeCotacao() : void  {
    var moedaSelecionada = (document.querySelector('select') as HTMLSelectElement).value;
    this.emprestimoService.getCotacao(moedaSelecionada).subscribe({
      next: (response) => {
         this.taxaDeCotacaoData = response.value; 
         
         this.taxaDeCotacao = (this.taxaDeCotacaoData[0]?.cotacaoVenda  - this.taxaDeCotacaoData[0]?.cotacaoCompra);
         this.cdr.detectChanges();
        }
      }
    );
    // Aqui você pode chamar o serviço para obter a taxa de cotação com base na moeda selecionada
  }
  
}



export interface MoedaData {
  
      simbolo: string;
      nomeFormatado: string;
      tipoMoeda: string;
    
  
}

export interface TaxaDeCotacaoMoedaData {
      cotacaoCompra: number;
      cotacaoVenda: number;
      dataHoraCotacao: string;
}