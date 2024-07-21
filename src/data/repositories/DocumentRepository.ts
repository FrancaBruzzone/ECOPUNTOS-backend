import { Repository } from './Repository';
import Document from '../models/Document';

export class DocumentRepository extends Repository<Document> {
    constructor() {
        super(Document);
    }

    // Métodos específicos para Document
}
