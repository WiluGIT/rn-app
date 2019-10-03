import {ADD_PLACE,DELETE_PLACE} from '../actions/actionTypes';
 
const initialState ={
    places: []
};

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(), 
                    name: action.placeName,
                    image: {
                      uri:"https://img.hopaj.pl/images/7/f/7f462fdd461229aa6bda7c52be5dec29.jpg"
                    }
                  })
            };
            case DELETE_PLACE:
                return{
                    ...state,
                    places: state.places.filter(place=>{
                        return place.key !==action.placeKey;
                       })
                       
                };
        
        default:
            return state;
    }
};

export default reducer;