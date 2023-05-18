import { IsString, IsUrl } from 'class-validator';

export class V2exItem {
  @IsString()
  title: string;

  @IsUrl()
  url: string;
}
