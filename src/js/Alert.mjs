function convertToJson(res) {
    if (res.ok) {
        console.log("There is some progress!")
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
 export default async function getData() {
      return fetch("../public/json/backpacks.json")
        .then(convertToJson)
        .then((data) => data);
    }