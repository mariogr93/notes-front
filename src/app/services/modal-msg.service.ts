import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SimpleModalData } from "../models/modal.interface";



@Injectable()
export class ModalService {


    private simpleModalData$ = new BehaviorSubject<SimpleModalData | null>(null);
    _simpleModalData = this.simpleModalData$.asObservable();

    func: Function | undefined;

    private showModal$ = new BehaviorSubject(false);
    _showModal = this.showModal$.asObservable();

    private showSimpleModal$ = new BehaviorSubject(false);
    _showSimpleModal = this.showSimpleModal$.asObservable();

    openModal(): void{
        if(!this.showModal$.value) {
            this.showModal$.next(true);
        }
    }

    closeModal(): void{
        if(this.showModal$.value) {
            this.showModal$.next(false);
        }
    }
    
    openSimpleModal(data: SimpleModalData): void{
        if(!this.showSimpleModal$.value) {
            this.simpleModalData$.next(data);
            this.showSimpleModal$.next(true);
        }
    }

    closeSimpleModal(): void{
        if(this.showSimpleModal$.value) {
            this.simpleModalData$.next(null);
            this.showSimpleModal$.next(false);
        }
    }

    delete(){
        if( this.func){
            this.func()
            if(this.showModal$.value) {
                this.showModal$.next(false);
            }
        }
    }

    actionButton(fn: Function) {
        this.func = fn;
    }
}