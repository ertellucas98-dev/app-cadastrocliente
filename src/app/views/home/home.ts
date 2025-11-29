import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ElementDialog } from '../../shared/element-dialog/element-dialog';
import {
 
  MatDialog,

} from '@angular/material/dialog';
import { cp } from 'fs';
import e from 'express';
import { ClienteService } from '../../services/cliente.service';
import { ElementDialogEmprestimo } from '../../shared/element-dialog-emprestimo/element-dialog-emprestimo';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [ClienteService],
})
export class Home  {
  @ViewChild('table') 
  table?: MatTable<any>;
  displayedColumns: string[] = ['id','nome', 'cpf', 'email', 'telefone', 'ações'];
  dataSource: ElementData[] = [] ;

constructor(
  public dialog: MatDialog,
  public clienteService: ClienteService,
private cdr: ChangeDetectorRef,) {

 
}

  ngOnInit(): void {
    this.clienteService.getElements().subscribe(data => {
    this.dataSource = data;
    this.cdr.detectChanges();
  });
  
  }

  

openDialog(element: ElementData | null,index: number = -1): void {
    const dialogRef = this.dialog.open(ElementDialog, {
      data: element === null ? {
        id: null,
        nome : "",
        cpf : "",
        email : "",
        telefone : "",
      }  : 
      {
        id: element.id,
        nome : element.nome,
        cpf : element.cpf,
        email : element.email,
        telefone : element.telefone ,
        index: index
      },
    });
    

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
      // encontrar o índice pelo CPF
      if (this.dataSource.map(íd => íd.id).includes(result.id)) {
        // edição — atualiza na posição original
       this.clienteService.updateElement(result.id, result).subscribe(() => {
        this.dataSource[result.id - 1] = result;
        this.table?.renderRows();
       });

        
      } else {
        // novo — cria
        
        this.clienteService.createElement(result).subscribe((data : ElementData) => {
          this.dataSource.push(data);
          this.table?.renderRows();
          }
        );
        
      }
      this.table?.renderRows();
    }
    });
  }

openDialogEmprestimo(element: ElementData | null,index: number = -1): void {
    const dialogRef = this.dialog.open(ElementDialogEmprestimo, {
      data: element === null ? {
        id: null,
        nome : "",
        cpf : "",
        email : "",
        telefone : "",
      }  : 
      {
        id: element.id,
        nome : element.nome,
        cpf : element.cpf,
        email : element.email,
        telefone : element.telefone ,
        index: index
      },
    });
    

    dialogRef.afterClosed().subscribe(result => {
      
      if (result !== undefined) {
      // encontrar o índice pelo CPF
      if (this.dataSource.map(íd => íd.id).includes(result.id)) {
        // edição — atualiza na posição origina

        
      } else {
        // novo — cria
        
        
      }
      this.table?.renderRows();
    }
    });
  }
  


  editElement(element: ElementData): void {
    this.openDialog(element);
  }

  deleteElement(id: string): void {
    this.clienteService.deleteElement(Number(id)).subscribe(() => {
      this.dataSource = this.dataSource.filter(element => element.id !== Number(id));
      this.table?.renderRows();
    }
    );
    
    
  }
}


export interface ElementData {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface ElementDataEmprestimo {
  id: number;
  dataemprestimo: Date;
  moeda: string;
  valorobtido: number;
  taxaconversao: number;
  datavencimento: Date;
}


