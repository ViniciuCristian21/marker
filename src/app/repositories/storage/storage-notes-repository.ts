import { NotesRepository, NotesCreateData } from './../notes-repository';


export class StorageNotesRepository implements NotesRepository {
  async create(data: NotesCreateData) {
    const notes = JSON.parse(localStorage.getItem("marker.notes")) || [];
    notes.push(data)
    localStorage.setItem("marker.notes", JSON.stringify(notes))
  }

  async remove(title: string) {
    const notes = JSON.parse(localStorage.getItem("marker.notes")) || [];
    const result = notes.filter(e => e.title != title)

    localStorage.setItem("marker.notes", JSON.stringify(result))
    // console.log(result)
  }
}
