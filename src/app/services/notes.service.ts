import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note, NoteCreate } from "../models/note.model";
import { CustomResponse } from "../models/custom-response.interface";


@Injectable()
export class NoteService {

    private readonly apiUrl = 'http://localhost:8080/api/v1/notes';
    // private readonly apiUrl ='https://notes-api-test-production.up.railway.app/api/v1/notes'

    

    constructor(private http: HttpClient){}


    createNote(note: NoteCreate): Observable<any> {
        return this.http.post<CustomResponse>( `${this.apiUrl}` ,note)
    }

    getAllUserNotes(userId: number): Observable<any> {
      return this.http.get<CustomResponse>(`${this.apiUrl}/user/${userId}`);
    }

    deleteNote(note: Note): Observable<any>{
      console.log("deleteNote",note)
      return this.http.delete<CustomResponse>(`${this.apiUrl}/user/${note.userId}/delete/${note.id}` )
    }

}