export type BookStatus = 'Reading' | 'Completed' | 'OnHold' | 'Pending';

export type ItemProps = {
  id: string;
  type: string;
  title: string;
  author?: string;
  rating?: number;
  opinion: string;
  image: string;
  subtype: string;
  order: number;
  status?: BookStatus;
  updatedAt?: string;
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