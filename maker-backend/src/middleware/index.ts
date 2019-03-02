import { checkAdminToken } from './check_admin_token';
import { checkUserToken } from './check_user_token';
import { upload } from './multer-s3';

export default { checkAdminToken, checkUserToken, upload };
