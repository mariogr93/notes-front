import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { catchError, throwError } from "rxjs";
import { Note, NoteCreate } from "src/app/models/note.model";
import { NoteService } from "src/app/services/notes.service";
import { SessionService } from "src/app/services/session.service";


@Component({
    selector:"create-note-component",
    templateUrl:"./create-note.component.html",
    styleUrls:["./create-note.component.css"]
})

export class CreateNoteComponent {

    newNoteForm = this.fb.group({
        title: ['', Validators.required],
        description:['', Validators.required],
        completed: false
    })

    @Output() newNoteEmitter = new EventEmitter<Note>();
    @Output() closeCreateNoteEmitter = new EventEmitter();
    @Input() formCreated = false;

    constructor(private fb: FormBuilder, private noteService: NoteService, private sessionService: SessionService,){}

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
                    return throwError(()=> err)
                })
            ).subscribe(res => {
                this.newNoteEmitter.emit(res.data.note);
                this.newNoteForm.reset()
                this.newNoteForm.get('completed')?.setValue(false);
                        
            })
        }
    }

    closeCreateNote():void {
        this.closeCreateNoteEmitter.emit()
    }
}