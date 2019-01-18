import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  removeDocument(id: string) {
    this.socket.emit('removeDoc', id);
  }

  private docId() {
    let text = 'Doc_';
    const allowedCharsForDocumentName = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 3; i++) {
      text += allowedCharsForDocumentName.charAt(Math.floor(Math.random() * allowedCharsForDocumentName.length));
    }

    return text;
  }
}
