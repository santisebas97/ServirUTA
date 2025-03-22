import { Component, OnInit } from '@angular/core';
import { Transportista } from 'src/app/models/transportista.model';
import { RecorridosService } from 'src/app/services/recorridos.service';
import { TransportistaService } from 'src/app/services/transportista.service';

@Component({
  selector: 'app-transportistas',
  templateUrl: './transportistas.component.html',
  styleUrls: ['./transportistas.component.css']
})
export class TransportistasComponent implements OnInit{

  public transportistas: any=[];
  public idTransportista!:number;
  public recorridos: any=[];
constructor(private transportistaService: TransportistaService, private recorridoService: RecorridosService){

}
  ngOnInit(): void {
    this.transportistaService.getTransportista().subscribe(res=>{
      //console.log(res);
      //parseInt(res.Telefono);
      this.transportistas=res;
      parseInt(this.transportistas.Telefono)
    })
  }

  capturarIdTransportista(id:number){
    this.idTransportista=id
    //console.log(this.idTransportista)
    this.recorridoService.obtenerRecorridosUsuario(this.idTransportista).subscribe(res=>{
      this.recorridos=res;
      //console.log(this.recorridos)
    })
  }

  
}
