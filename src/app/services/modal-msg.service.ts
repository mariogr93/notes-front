import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable()
export class ModalService {


    func: Function | undefined;


    private showModal$ = new BehaviorSubject(false);
    _showModal = this.showModal$.asObservable();

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