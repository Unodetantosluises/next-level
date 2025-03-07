import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { addDoc, deleteDoc, doc, DocumentData, DocumentReference, getDoc, orderBy, query, updateDoc } from "@firebase/firestore";
import { APP_CONTANTS } from "@shared/constants";
import { Autor } from "./autor.interfaces";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
  export class AutorService {
    private readonly _firestore = inject(Firestore);
    private readonly _autorCollection = collection(this._firestore, APP_CONTANTS.COLLECTION_NAME);

    newAutor(autor: Partial<Autor>):Promise<DocumentReference<DocumentData, DocumentData>> {
      return addDoc(this._autorCollection, {
        created: Date.now(),
        updated: Date.now(),
        ...autor,
      })
    }

    getAllAutors(){
      const queryFn = query(this._autorCollection, orderBy('created', 'desc'));
      return collectionData(queryFn, {idField: 'id'}) as Observable<Autor[]>
    }

    async getAutorById(id:string): Promise<Autor> {
      const docRef = this._getDocRef(id);
      const documentData = await getDoc(docRef);
      return documentData.data() as Autor;
    }

    updateAutor(id: string, autor: Autor): void {
      const docRef = this._getDocRef(id);
      updateDoc(docRef, {
        ...autor
      });
    }

    deleteAutor(id: string):void {
      const docRef = this._getDocRef(id);
      deleteDoc(docRef)
    }

    private _getDocRef(id:string) {
      return doc(this._firestore, APP_CONTANTS.COLLECTION_NAME, id);
    }
  }
