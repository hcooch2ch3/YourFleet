import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

export interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const location_name = searchParams.get("location_name");
    const robot_id = searchParams.get("robot_id");
    const is_starred = searchParams.get("is_starred");
    const page = parseInt(searchParams.get("page") || "1", 10);

    let filteredLocations: Location[] = locations;
    if (location_name == undefined) {
      filteredLocations = locations;
    }

    if (location_name) {
      filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(location_name.toLowerCase()),
      );
    }

    if (filteredLocations.length == 0 && robot_id) {
      filteredLocations = locations.filter((location) =>
        location.robot.id.toLowerCase().includes(robot_id.toLowerCase()),
      );
    }

    if (is_starred) {
      const starredIds = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]",
      );
      if (is_starred === "true") {
        filteredLocations = locations.filter((location) =>
          starredIds.includes(location.id),
        );
      }
    }

    const itemsPerPage = 6;
    const offset = (page - 1) * itemsPerPage;
    const paginatedLocations = filteredLocations.slice(
      offset,
      offset + itemsPerPage,
    );

    const result: LocationsResult = {
      total_count: filteredLocations.length,
      locations: paginatedLocations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );
    const starred_location_ids =
      Object.keys(location_ids).length === 0
        ? []
        : location_ids.starred_location_ids;
    return HttpResponse.json({
      starred_location_ids: starred_location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    if (!request.body) {
      return HttpResponse.json({ status: 500 });
    }

    try {
      const data = await request.json();

      sessionStorage.setItem("starred_location_ids", JSON.stringify(data));

      return new HttpResponse(null, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return HttpResponse.json({ status: 500 });
    }
  }),
];
