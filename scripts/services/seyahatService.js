const { request } = require("./http");

module.exports = {
    getAccomodationOptions: () => new Promise((resolve, reject) => {
        request("/mobile/accomodationOptions", "", { method: "GET" }).then(resolve, reject);
    }),
    getAgentList: (userID) => new Promise((resolve, reject) => {
        request("/mobile/agentList", `/${userID ||"TCUERDEM" }`, { method: "GET" }).then(resolve, reject);
    }),
    getAirportOptions: (from, to) => new Promise((resolve, reject) => {
        request("/mobile/airportOptions", `/${from}/${to}`, { method: "GET" }).then(resolve, reject);
    }),
    getAutocompleteCity: (searchText) => new Promise((resolve, reject) => {
        request("/mobile/autocompleteCity", "/" + searchText, { method: "GET" }).then(resolve, reject);
    }),
    getTripConditions: () => new Promise((resolve, reject) => {
        request("/mobile/tripConditions", "", { method: "GET" }).then(resolve, reject);
    }),
    getTripOptions: () => new Promise((resolve, reject) => {
        request("/mobile/tripOptions", "", { method: "GET" }).then(resolve, reject);
    }),
    getHotels: () => new Promise((resolve, reject) => {
        request("/mobile/hotel", "/127", { method: "GET" }).then(resolve, reject);
    }),
    getHotelPrice: (body) => new Promise((resolve, reject) => {
        request("/mobile/price/hotel", "", {
            method: "POST",
            body: body || {
                "otelId": 25,
                "startDate": "2019-02-22T08:22:54",
                "endDate": "2019-02-28T08:22:54",
                "roomType": "S",
                "accommodationType": "BB"
            }
        }).then(resolve, reject);
    })
};
