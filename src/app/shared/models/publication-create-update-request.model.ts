export interface PublicationCreateRequest {
  id?:number;
  title: string;
  content: string;
  video_url: string;
  filePath: string;
  visibility: string;
  category_id: number;
  creator_id: number;
  schedulePublishAt?: Date;
}
