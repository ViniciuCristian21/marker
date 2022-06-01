import { NotesRepository } from './../repositories/notes-repository';

export class RemoveNotesUseCase {
  constructor(
    private notesRepository: NotesRepository,
  ) {}

  async execute(title: string) {
    this.notesRepository.remove(title)
  }
}
