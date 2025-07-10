import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3',
    // params: {
    //     api_key: 'vteTG09tge5SF58uMlDNDrj4PrjhQZQOdYdxitJv'
    // }
})
