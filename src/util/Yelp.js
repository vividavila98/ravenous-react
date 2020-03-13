import Axios from "axios";

const apiKey = '5D0xWJ2XUi9J-tgEdxIPl68_HlgNFIoA5bgb-8Lpcy-a7hVDO0nLo7-TgOFcM9t9T6MDzOnO2xX4ry-dhacnRfLLsIZsWNRuJqz1RJ_s0SvoAhV6ojCj19Jm2qpqXnYx';
const Yelp = { };

const options = {
    headers: { 
        Authorization: `Bearer ${apiKey}`

    }
}

// retrieves businesses search results from Yelp API
// request to retrieve businesses: GET https://api.yelp.com/v3/businesses/search
//search?term=term&location=location&sort_by=SortBy
export async function search(term, location, sortBy) {
    try {
        let res = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, options);
        let data = res.data;
        if(data.businesses) {
            // return an array that has all of the business properties
            // we need: name, address, city, etc. 
            return data.businesses.map(business => {
                return {
                    id: business.id,
                    image: business.image_url,
                    name: business.name,
                    address: business.location.display_address,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories.title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                };
            });
        }
    } catch(error) {
        console.error(error);
    }
}

export default Yelp;