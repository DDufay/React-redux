import {AT_POSTS} from "../actions/action-types";

export default function reducerPosts(state = [], action) {
    switch (action.type) {
        case AT_POSTS.READ_ALL:
            return action.payload;
        case AT_POSTS.CREATE:
            return [...state, action.payload]
        case AT_POSTS.DELETE:
            console.log(action.payload);
            return state.filter((post) => !(post.id == action.payload));
    }

    return state;
}
