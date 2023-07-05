export class Fenglou7 {
  apiResponse: ApiResponse;

  constructor(apiResponse: ApiResponse) {
    this.apiResponse = apiResponse;
  }
}
export interface ApiResponse {
  pageData: PageData[];
  currentPage: number;
  perPage: number;
  totalCount: number;
  firstPageUrl: string;
  nextPageUrl: string;
  prePageUrl: string;
  pageLength: number;
  totalPage: number;
}

export interface PageData {
  user: User;
  group: Group;
  displayTag: DisplayTag;
  position: Position;
  ability: Ability;
  content: Content;
  freewords: number;
  userStickStatus: boolean;
}

export interface User {
  nickname: string;
}

export interface Group {
  item: any;
}

export interface DisplayTag {
  item: any;
}

export interface Position {
  item: any;
}

export interface Ability {
  canDelete: boolean;
  canDownloadAttachment: boolean;
  canEdit: boolean;
  canEssence: boolean;
  canFreeViewPost: boolean;
  canReply: boolean;
  canStick: boolean;
  canViewAttachment: boolean;
  canViewPost: boolean;
  canViewVideo: boolean;
}

export interface Content {
  indexes: any;
  text: string;
}
