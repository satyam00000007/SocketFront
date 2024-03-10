import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  data:any = {
    sale: 0,
    revenue:0,
    customer:0
  };
  Product:any = {
    sale: 0,
    revenue:0,
    customer:0
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'sale ($)', 'Revenue ($)', 'Customer' ],
    datasets: [{
      label: 'Socket Data',
      data: [0,0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
      ]
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  
  constructor(private socket: Socket){
    
  }

  ngOnInit(): void {
    this.socket.fromEvent('Socket-Connection').subscribe((connection:any) => {
      console.log(connection);
    })

    this.socket.fromEvent('server-resp').subscribe((resp:any) => {
      this.data = resp.clientData;
      if(resp.clientData){
        this.barChartData = {...this.barChartData, datasets :[{
          ...this.barChartData.datasets[0],
          data:[Number(resp.clientData.sale), Number(resp.clientData.revenue),Number(resp.clientData.customer)]
        }] }
      }
    })
  }

  sendMessage(){

      let sendData = {sender :"client", clientData : this.Product};
      this.socket.emit("client-event", sendData);
    
  }

  handleNonNumber(event:any){
    if(['e', 'E', '+', '-'].includes(event.key)){
      event.preventDefault();
    }
  }

}
