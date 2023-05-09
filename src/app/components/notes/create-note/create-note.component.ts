import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription, catchError, throwError, timer } from "rxjs";
import { Note, NoteCreate } from "src/app/models/note.model";
import { ModalService } from "src/app/services/modal-msg.service";
import { NoteService } from "src/app/services/notes.service";
import { SessionService } from "src/app/services/session.service";
import { unsubscribeMany } from "src/utils/subscription-management";


@Component({
    selector:"create-note-component",
    templateUrl:"./create-note.component.html",
    styleUrls:["./create-note.component.css"]
})

export class CreateNoteComponent {

    subs: Subscription[] = [];

    newNoteForm = this.fb.group({
        title: ['', Validators.required],
        description:['', Validators.required],
        completed: false
    })

    @Output() newNoteEmitter = new EventEmitter<Note>();
    @Output() closeCreateNoteEmitter = new EventEmitter();
    @Input() formCreated = false;

    constructor(private fb: FormBuilder, 
        private noteService: NoteService, 
        private sessionService: SessionService,
        private modal: ModalService){}

        ngOnDestroy(): void {
            unsubscribeMany(this.subs);
        }

    checkNote() {
        const completed = this.newNoteForm.get("completed") 
        completed?.setValue(!completed.value) //= !this.newNoteForm.get("completed")?.value
        
    }

    onSubmit() {
        if( this.sessionService.token ) {
            const newNote = {...this.newNoteForm.value, userName: this.sessionService.getUserInfo()?.email}
            
            this.noteService.createNote(newNote).pipe(
                catchError(err => {
                    console.log("catchError", err)
                    this.openSimpleModalDanger()
                    return throwError(()=> err)
                })
            ).subscribe(res => {
                this.newNoteEmitter.emit(res.data.note);
                this.newNoteForm.reset()
                this.newNoteForm.get('completed')?.setValue(false);
                this.openSimpleModalSuccess();
                        
            })
        }
    }

    closeCreateNote():void {
        this.closeCreateNoteEmitter.emit()
    }

    openSimpleModalSuccess(){
        this.modal.openSimpleModal({title: "Saved!", message:"Note was added successfully.", isSuccess: true})
        this.subs.push(timer(1500).subscribe(() => this.modal.closeSimpleModal()));

    }

    openSimpleModalDanger(){
        this.modal.openSimpleModal({title: "Ooops!", message:"Something went wrong saving your note, please try again.", isSuccess: false})
        this.subs.push(timer(1500).subscribe(() => this.modal.closeSimpleModal()));

    }
}