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
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    Feather.replace();

    this.notes = this.notesService.getAll();
  }
  deleteNote(id: number) {
    this.notesService.delete(id);
  }
}
