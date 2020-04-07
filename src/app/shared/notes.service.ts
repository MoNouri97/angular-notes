import { Injectable } from "@angular/core";
import { Note } from "./note.model";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.notes.push(new Note("note " + i, "body for note " + i));
    }
  }

  getAll(): Note[] {
    return this.notes;
  }
  get(id: number): Note {
    return this.notes.find((n) => n.id == id);
  }
  // getId(note: Note) {
  //   return this.notes.indexOf(note);
  // }
  add(note: Note) {
    let newLength = this.notes.push(note);
    return newLength;
  }
  update(id: number, title: string, body: string) {
    let note = this.get(id);
    note.title = title;
    note.body = body;
  }
  delete(id: number) {
    this.notes = this.notes.filter((n) => n.id != id);
    console.log(this.notes.length);
  }
}
