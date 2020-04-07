import { Component, OnInit } from "@angular/core";
import * as Feather from "feather-icons";
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from "@angular/animations";

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"],
  animations: [
    trigger("itemAnim", [
      // in animation
      transition("void => *", [
        // initial
        style({
          height: 0,
          opacity: 0,
          transform: "scale(0.85)",
          "margin-bottom": 0,
          // expand the padding
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate(
          "50ms",
          style({
            height: "*",
            "margin-bottom": "*",
            paddingTop: "*",
            paddingBottom: "*",
            paddingRight: "*",
            paddingLeft: "*",
          })
        ),
        animate(68),
      ]),
      transition("* => void", [
        // scale up
        animate(
          50,
          style({
            transform: "scale(1.05)",
          })
        ),
        // scale down
        animate(
          50,
          style({
            transform: "scale(1)",
            opacity: 0.75,
          })
        ),
        animate(
          "120ms ease-out",
          style({
            transform: "scale(0.68)",
            opacity: 0,
          })
        ),
        // animate space
        animate(
          "150ms ease-out",
          style({
            height: 0,
            "margin-bottom": 0,
            // expand the padding
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),
    trigger("listAnim", [
      transition("*=>*", [
        query(
          ":enter",
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate(".2s ease")]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[];
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    Feather.replace();

    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }
  deleteNote(id: number) {
    this.notes = this.notes.filter((n) => n.id != id);
    this.filteredNotes = this.filteredNotes.filter((n) => n.id != id);
    this.notesService.delete(id);
  }

  filter(query: string) {
    // getting words
    query = query.toLowerCase().trim();

    if (query == "") {
      // empty search
      this.filteredNotes = this.notes;
      return;
    }

    let terms: string[] = query.split(" ");

    // removing duplicates
    terms = this.removeDuplicates(terms);

    let allResults: Note[] = new Array<Note>();

    terms.forEach((term) => {
      let results: Note[] = this.relevantNotes(term);
      allResults.push(...results);
    });

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let unique: Set<any> = new Set<any>();

    arr.forEach((e) => unique.add(e));
    return Array.from(unique);
  }

  relevantNotes(query: string): Note[] {
    query = query.toLowerCase().trim();
    let relevant = this.notes.filter((note) => {
      return (
        (note.body && note.body.toLowerCase().trim().includes(query)) ||
        note.title.toLowerCase().trim().includes(query)
      );
    });
    return relevant;
  }

  sortByRelevancy(searchRes: Note[]) {
    let noteCount: object = {};

    searchRes.forEach((note) => {
      let noteId = note.id;

      if (noteCount[noteId]) {
        noteCount[noteId] += 1;
      } else {
        noteCount[noteId] = 1;
      }
    });
    this.filteredNotes = this.filteredNotes.sort((a, b) => {
      return noteCount[b.id] - noteCount[a.id];
    });
  }
}
