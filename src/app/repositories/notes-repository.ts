
export interface NotesCreateData {
  title: string;
  text: string;
}

export interface NotesRepository {
  create: (data: NotesCreateData) => Promise<void>;
  remove: (data: string) => Promise<void>;
}
