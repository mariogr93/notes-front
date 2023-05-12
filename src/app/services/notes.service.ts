import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note, NoteCreate } from "../models/note.model";
import { CustomResponse } from "../models/custom-response.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class NoteService {
    private readonly domain = environment.DOMAIN;
    private readonly endpoint = '/api/v1/notes'
    //private readonly apiUrl ='https://notes-api-production-2963.up.railway.app/api/v1/notes'

    

    constructor(private http: HttpClient){}


    createNote(note: NoteCreate): Observable<any> {
        return this.http.post<CustomResponse>( `${this.domain}${this.endpoint}` ,note)
    }

    getAllUserNotes(userId: number): Observable<any> {
      return this.http.get<CustomResponse>(`${this.domain}${this.endpoint}/user/${userId}`);
    }

    deleteNote(note: Note): Observable<any>{
      console.log("deleteNote",note)
      return this.http.delete<CustomResponse>(`${this.domain}${this.endpoint}user/${note.userId}/delete/${note.id}` )
    }

}