# Angular Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

---

A simple note taking app using Angular .

## Features

- saving notes
- Editing and Removing
- Searching

the search feature filters the notes to only show ones containing at least one word in the search query , then the notes are **sorted by relevancy** (the ones with more matches are first on the list).

**[See Screenshot below](###Search)**

The app is using local storage to save notes

```ts
updateStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
```

## UI

Designed using Bulma CSS framework **with some customization**,
[Changed Styles are here](./src/main-styles.scss)
And used Angular Animation for the the animations

### Home

![screenshot](< screenshots/Screenshot from 2020-04-07 23-33-22.png> "Main screen")

### Edit / View Note

![screenshot](<screenshots/Screenshot from 2020-04-07 23-36-10.png> "Note screen")

### Search

![screenshot](<screenshots/Screenshot from 2020-04-07 23-37-11.png> "Search")

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
