import Restaurant from "../../models/restaurant.js"

const fetchRestaurantData = async (_, res) => {
    try{
        const restaurantData = await Restaurant.find();
        return res.status(200).json({
            success : true,
            message : restaurantData.length ? 'fetched restaurant data' : 'no restaurant found',
            restaurantData,
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching restaurants data'
        })
    }
}

export default fetchRestaurantData;