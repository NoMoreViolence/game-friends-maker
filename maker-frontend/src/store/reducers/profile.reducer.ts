import { produce } from 'immer';
import { ProfileActions } from './../actions';
import { Profile } from '../models';

const initialState: Profile = {
  introduce: '',
  pictureUrl: '',
  visibility: 0,
  getMyProfileStatus: 'none'
};

const profileReducer = (state: Profile = initialState, action: ProfileActions) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_MY_PROFILE':
        draft.getMyProfileStatus = 'pending';
        break;
      case 'GET_MY_PROFILE_SUCCESS':
        draft.introduce = action.payload.introduce;
        draft.pictureUrl = action.payload.pictureUrl;
        draft.visibility = action.payload.visibility;
        draft.getMyProfileStatus = 'success';
        break;
      case 'GET_MY_PROFILE_FAILURE':
        draft.getMyProfileStatus = 'none';
        break;

      case 'UPLOAD_PROFILE_PICTURE':
        break;
      case 'UPLOAD_PROFILE_PICTURE_SUCCESS':
        break;
      case 'UPLOAD_PROFILE_PICTURE_FAILURE':
        break;

      case 'DELETE_PROFILE_PICTURE':
        break;
      case 'DELETE_PROFILE_PICTURE_SUCCESS':
        break;
      case 'DELETE_PROFILE_PICTURE_FAILURE':
        break;

      case 'CHANGE_PROFILE':
        break;
      case 'CHANGE_PROFILE_SUCCESS':
        break;
      case 'CHANGE_PROFILE_FAILURE':
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
