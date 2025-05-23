import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../lib/store";
import { BACKEND_URL } from "../../lib/const";
import { authedFetchWithError } from "../utils";

export type LiveSessionLocation = {
  lat: number;
  lon: number;
  count: number;
  city: string;
};

export function useGetLiveSessionLocations(minutes = 5) {
  const { site } = useStore();
  return useQuery<LiveSessionLocation[]>({
    queryKey: ["live-session-locations", site, minutes],
    queryFn: () =>
      authedFetchWithError(
        `${BACKEND_URL}/live-session-locations/${site}?time=${minutes}`
      ).then((res: any) => res.data),
  });
}
