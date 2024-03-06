export interface Banner {
  banner_id: string;
  banner_title: string;
  banner_image_url: string;
  banner_start_day: string;
  banner_end_day: string;
  created_at: string;
}

export function createBanner(
  banner_id: string,
  banner_title: string,
  banner_image_url: string,
  banner_start_day: string,
  banner_end_day: string,
  created_at: string,
): Banner {
  return {
    banner_id,
    banner_title,
    banner_image_url,
    banner_start_day,
    banner_end_day,
    created_at,
  };
}
