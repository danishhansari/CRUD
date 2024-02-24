import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccount,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
// logout route
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccount);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("watchhistory").get(verifyJWT);

// router.route("c/:username").get(verifyJWT, getUserChannelProfile);
// router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
