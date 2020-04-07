import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Note } from "../../shared/note.model";
import { NotesService } from "src/app/shared/notes.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-note-details",
  templateUrl: "./note-details.component.html",
  styleUrls: ["./note-details.component.scss"],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteId: number;
  new: boolean;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.note = new Note();

    // creating or editing
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }
  onSubmit(form: NgForm) {
    if (this.new) {
      // save note
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl("/");
  }

  cancel() {
    this.router.navigateByUrl("/");
  }
}
