import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import feedSlice from './feedSlice';
import connectionSlice from './connectionSlice';
import requestSlice from './requestSlice';
import themeSlice from './themeSlice';
import sidebarSlice from './sidebarSlice';

const store=configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connection:connectionSlice,
        request:requestSlice,
        theme:themeSlice,
        sideBar:sidebarSlice,
    }
});

export default store;