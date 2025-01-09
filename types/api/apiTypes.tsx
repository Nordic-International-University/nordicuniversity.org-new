export interface getAllFaqsParameterTypes {
  page: string;
  limit: string;
  lang: string;
  clientIpAddress?: string;
}

export interface getAllAlbumsByTypeProps {
  lang: string;
  type: string;
}

export enum EnumEduDegree {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
}

export enum timeFilter {
  future = "future",
  past = "past",
}

export enum meetingType {
  CONNECTIONS = "CONNECTIONS",
  SCHOLARSHIPS_AND_INTERNSHIPS = "SCHOLARSHIPS_AND_INTERNSHIPS",
  FORUM_AND_PROJECTS = "FORUM-AND-PROJECTS",
}

export interface getAllMeetingType {
  page: number;
  limit: number;
  time: timeFilter;
  type: meetingType;
  lang: string;
}

export interface ContactMessage {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  message: string;
}
