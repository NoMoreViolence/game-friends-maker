import { produce } from 'immer';
import { ProfileActions } from './../actions';
import { Profile } from '../models';

const initialState: Profile = {
  username: '',
  introduce: '',
  pictureUrl: '',
  visibility: 0,
  actionStatus: 'none'
};

const profileReducer = (state: Profile = initialState, action: ProfileActions) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_MY_PROFILE':
        draft.actionStatus = 'pending';
        break;
      case 'GET_MY_PROFILE_SUCCESS':
        draft.username = action.payload.username;
        draft.introduce = action.payload.introduce;
        draft.pictureUrl = action.payload.pictureUrl;
        draft.visibility = action.payload.visibility;
        draft.actionStatus = 'success';
        break;
      case 'GET_MY_PROFILE_FAILURE':
        draft.actionStatus = 'none';
        break;

      case 'UPLOAD_PROFILE_PICTURE':
        draft.actionStatus = 'pending';
        break;
      case 'UPLOAD_PROFILE_PICTURE_SUCCESS':
        draft.actionStatus = 'success';
        break;
      case 'UPLOAD_PROFILE_PICTURE_FAILURE':
        draft.actionStatus = 'none';
        break;

      case 'DELETE_PROFILE_PICTURE':
        draft.actionStatus = 'pending';
        break;
      case 'DELETE_PROFILE_PICTURE_SUCCESS':
        draft.actionStatus = 'success';
        break;
      case 'DELETE_PROFILE_PICTURE_FAILURE':
        draft.actionStatus = 'none';
        break;

      case 'CHANGE_PROFILE':
        draft.actionStatus = 'pending';
        break;
      case 'CHANGE_PROFILE_SUCCESS':
        draft.actionStatus = 'success';
        break;
      case 'CHANGE_PROFILE_FAILURE':
        draft.actionStatus = 'none';
        break;

      case 'CHANGE_PROFILE_VISIBILITY':
        break;
      case 'CHANGE_PROFILE_VISIBILITY_SUCCESS':
        break;
      case 'CHANGE_PROFILE_VISIBILITY_FAILURE':
        break;

      default:
        break;
    }
  });

export { profileReducer };
