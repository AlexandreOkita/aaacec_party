import http from "k6/http";
import { check } from "k6";

export function loadTest() {
  const url = "https://aaacec-party.vercel.app/api/v1/guest/";
  const payload = JSON.stringify({
    name: "pipoca",
    number: 2,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im9raXRhMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzYzODQyNSwiZXhwIjoxNzE4ODQ4MDI1fQ.TSBd6iSZmdnrLiHfLHLa5FJPuDtqtnSvyzCFN4WfQP4",
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "is status 200": (r) => r.status === 200,
  });
}

export let options = {
  vus: 3,
  duration: "120s",
};

export default loadTest;
