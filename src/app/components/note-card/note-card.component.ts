import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input
} from "@angular/core";

@Component({
  selector: "app-note-card",
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"]
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() body: string;

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

  ngOnInit(): void {}
}
