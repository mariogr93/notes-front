import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './services/modal-msg.service';
import { unsubscribeMany } from 'src/utils/subscription-management';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  showModal: boolean = false;
  showSimpleModal: boolean = false;
  constructor(private modal: ModalService){}
  ngOnInit(): void {
    
    this.subs.push(this.modal._showModal.subscribe(res => this.showModal = res));
    this.subs.push(this.modal._showSimpleModal.subscribe(res => this.showSimpleModal = res));
    
  }
  
  ngOnDestroy(): void {
    unsubscribeMany(this.subs)
  }

}
