import {createSlice} from '@reduxjs/toolkit';

type UserLoginProps = {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string
};

type initialStateProps = {
  user: UserLoginProps;
};

const initialState: initialStateProps = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const {first_name, last_name, email, profile_image} = action.payload;
      state.user = {first_name, last_name, email, profile_image};
    },
  },
});

export const {userLogin} = userSlice.actions;
export default userSlice.reducer;
