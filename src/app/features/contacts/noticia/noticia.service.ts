import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { APP_CONTANTS } from "@shared/constants";
import { doc, orderBy, query, DocumentData, getDoc } from '@firebase/firestore';
import { Observable } from "rxjs";
import { Noticia } from "./noticia.interface";

@Injectable({providedIn: 'root'})
export class NoticiaService {
  private readonly _firestore = inject(Firestore);
  private readonly _noticiaCollection = collection(this._firestore, APP_CONTANTS.COLLECTION_NAME_NOTICIA);

  getAllNoticias(){
    const queryFn = query(this._noticiaCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<Noticia[]>
  }

  async getNoticiaById(id:string): Promise<Noticia> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Noticia;
  }

  private _getDocRef(id:string) {
    return doc(this._firestore, APP_CONTANTS.COLLECTION_NAME_NOTICIA, id);
  }
}
