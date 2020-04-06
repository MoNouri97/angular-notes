import { Component, OnInit } from "@angular/core";
import * as Feather from "feather-icons";

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"]
})
export class NotesListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Feather.replace();
  }
}
