import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure';
import Iframe from './components/IframePane'
import { resolvePreviewUrl } from './resolve-production-url'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!),
      ),
    ]);

export default structure;

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title('Preview')
        .options({
          url: (doc: any) => resolvePreviewUrl(doc),
          reload: { button: true },
        }),
    ])
  }
  return S.document()
}
