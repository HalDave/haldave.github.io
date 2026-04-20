export type BookStatus = 'Reading' | 'Completed' | 'OnHold' | 'Pending';

export type GameStatus = 'Playing' | 'Completed' | 'OnHold' | 'Pending';

export type ItemProps = {
  id: string;
  type: string;
  title: string;
  author?: string;
  developer?: string;
  rating?: number;
  opinion: string;
  image: string;
  subtype: string;
  order: number;
  status?: BookStatus | GameStatus;
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
  googleBooksId: string;
};

export type GameSearchResult = {
  title: string;
  developer: string;
  thumbnail: string | null;
  gameId: string;
};