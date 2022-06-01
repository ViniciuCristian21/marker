import { NotesRepository } from './../repositories/notes-repository';

interface SubmitNotesUseCaseRequest {
  title: string;
  text: string;
}

export class SubmitNoteUseCase {
  constructor(
    private notesRepository: NotesRepository,
  ) {}

  async execute(request: SubmitNotesUseCaseRequest) {
    const {title, text} = request;

    this.notesRepository.create({
      title,
      text
    })
  }
}
