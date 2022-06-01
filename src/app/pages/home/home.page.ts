import { RemoveNotesUseCase } from './../../use-cases/remove-notes-use-case';
import { SubmitNoteUseCase } from './../../use-cases/submit-notes-use-case';
import { StorageNotesRepository } from './../../repositories/storage/storage-notes-repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  AllNotes: any[] = [];
  title: string;
  text: string;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.AllNotes = this.getAllNotes()
  }

  async saveNote() {
    const title = this.title;
    const text = this.text;

    const storageNotesRepository = new StorageNotesRepository()

    const submitNoteUseCase = new SubmitNoteUseCase(
      storageNotesRepository
    )

    await submitNoteUseCase.execute({
      title,
      text
    })


    document.location.reload();
    return "enviado com sucesso";
  }

  getAllNotes() {
    return JSON.parse(localStorage.getItem("marker.notes")) || []
  }

  removeNote(title: string) {
    this.presentAlertConfirm(title)
  }

  async presentAlertConfirm(title) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Exclusão.',
      message: 'Deseja realmente <strong>excluir</strong> ?.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: async () => {
            try {
              const storageNotesRepository = new StorageNotesRepository()
              const removeNoteUseCase = new RemoveNotesUseCase(
                storageNotesRepository
              )
              await removeNoteUseCase.execute(title)
            } catch (err) {
              console.log(err.message)
            } finally {
              document.location.reload();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
