import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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
  
  constructor(private socket: Socket){
    
  }

  ngOnInit(): void {
    this.socket.fromEvent('new-email').subscribe((email:any) => {
      console.log(email)
    })

    this.socket.fromEvent('server-resp').subscribe((resp:any) => {
      console.log(resp)
      this.data = resp.clientData;
    })
  }

  sendMessage(event:any){
    let nonInputValues = ['e', 'E', '+', '-'].includes(event.key);
    if(nonInputValues){
      event.preventDefault();
    }
    let clientData = {sender :"client", clientData : this.Product};
    this.socket.emit("client-event", clientData);
  }
}
