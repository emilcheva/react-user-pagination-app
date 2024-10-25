import { http, HttpResponse } from "msw";

// Mock data populated with Postman via https://documenter.getpostman.com/view/19878710/2s93Jrwk3R#3d963da6-87b3-45da-8d29-9f39d6bbf4d2
const mockedUsers = [
  {
    name: {
      first: "Marcus",
      last: "Madsen",
    },
    location: {
      street: {
        number: 1894,
        name: "Gammel Viborgvej",
      },
      city: "Assens",
      state: "Danmark",
      country: "Denmark",
    },
    email: "marcus.madsen@example.com",
    login: {
      uuid: "97d33104-fa05-40de-987f-132817f0af86",
    },
    phone: "14906954",
    picture: {
      large: "https://randomuser.me/api/portraits/men/51.jpg",
    },
  },
  {
    name: {
      first: "Karl",
      last: "Johnson",
    },
    location: {
      street: {
        number: 6057,
        name: "Avondale Ave",
      },
      city: "New York",
      state: "New York",
      country: "United States",
    },
    email: "karl.johnson@example.com",
    login: {
      uuid: "97890990-7bf2-469d-981c-16a10ae5307f",
    },
    phone: "(268) 420-4900",
    picture: {
      large: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  },
  {
    name: {
      first: "Mirja",
      last: "Stecher",
    },
    location: {
      street: {
        number: 4969,
        name: "Kirchweg",
      },
      city: "Sonthofen",
      state: "Niedersachsen",
      country: "Germany",
    },
    email: "mirja.stecher@example.com",
    login: {
      uuid: "446b4f8d-f8ac-44c0-af9c-9533cbdb278d",
    },
    phone: "0737-2219030",
    picture: {
      large: "https://randomuser.me/api/portraits/women/64.jpg",
    },
  },
];

const restHandlers = [
  http.get("https://randomuser.me/api/", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    if (page === "1") {
      return HttpResponse.json({
        results: mockedUsers,
        hasMore: true,
      });
    } else if (page === "2") {
      return HttpResponse.json({
        results: mockedUsers.slice(0),
        hasMore: true,
      });
    }
  }),
];

export const handlers = [...restHandlers];
