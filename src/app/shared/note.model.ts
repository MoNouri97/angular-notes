export class Note {
  id: number;
  title: string;
  body: string;
  static nextId: number;

  constructor(title: string, body?: string) {
    if (!Note.nextId) {
      Note.nextId = 0;
    }
    this.id = Note.nextId++;
    this.body = body || "";
    this.title = title;
  }
}
