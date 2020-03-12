import Axios from "axios";

const apiKey = '5D0xWJ2XUi9J-tgEdxIPl68_HlgNFIoA5bgb-8Lpcy-a7hVDO0nLo7-TgOFcM9t9T6MDzOnO2xX4ry-dhacnRfLLsIZsWNRuJqz1RJ_s0SvoAhV6ojCj19Jm2qpqXnYx';
const Yelp = {}; // stores functionality needed to interact with Yelp API
const custom_header = {
    headers: { Authorization: `Bearer ${apiKey}` }
}

// retrieves businesses search results from Yelp API
// request to retrieve businesses: GET https://api.yelp.com/v3/businesses/search
//search?term=term&location=location&sort_by=SortBy
async function search(term, location, sortBy) {
    let res = await Axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, custom_header);
    return res;
};