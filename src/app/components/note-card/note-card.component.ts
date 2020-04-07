import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Note } from "src/app/shared/note.model";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"],
})
export class NoteCardComponent implements AfterViewInit {
  @Input() note: Note;

  @Output("delete") deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("fade")
  fade: ElementRef<HTMLElement>;

  @ViewChild("bodyText")
  bodyText: ElementRef<HTMLElement>;

  constructor(private render: Renderer2) {}
  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.render.setStyle(this.fade.nativeElement, "display", "block");
    } else {
      this.render.setStyle(this.fade.nativeElement, "display", "none");
    }
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
