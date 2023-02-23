function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
 export default async function getData() {
      return fetch("../public/json/alerts.json")
        .then(convertToJson)
        .then((data) => data);
    }