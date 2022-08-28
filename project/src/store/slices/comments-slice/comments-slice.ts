import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../settings';
import { CommentType } from '../../../types/comment-type';
import { setComment, getOffer } from '../../action-creaters-middleware';

type StateType = {
  comments: CommentType[];
};

const initialState: StateType = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })

      .addCase(getOffer.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
      })

      .addCase(getOffer.rejected, (state) => {
        state.comments = [];
      });
  },
});
