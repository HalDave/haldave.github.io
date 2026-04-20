export type ItemProps = {
  id: string;
  type: string;
  title: string
  rating?: number;
  opinion: string;
  image: string;
  subtype: string;
  order: number;
}

export function compareItemsByOrder(a: any, b: any) {
  return a.order - b.order;
}

export type BookSearchResult = {
  title: string;
  author: string;
  isbn: string | null;
  openLibraryId: string | null;
  thumbnail: string | null;
};