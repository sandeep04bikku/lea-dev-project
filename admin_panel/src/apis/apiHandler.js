import { axiosClient } from './apiClient'

//============================================================================//
//============================ user api start=================================//
//============================================================================//

export function login(data) {
  // console.log(data,"login data api handler");
  return axiosClient.post('/lea-training/v1/admin/auth/login-admin', data)
}

export function logoutAdmin(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/logout-admin', data)
}

export function forgotPassword(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/forget-password', data)
}

export function resendNewOtp(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/resend-otp', data)
}

export function otpVerification(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/verify-otp', data)
}

export function resetPassword(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/create-new-password', data)
}

export function changePassword(data) {
  return axiosClient.post('/lea-training/v1/admin/auth/change-password', data)
}

// export function getProfile(data) {
//   return axiosClient.post('/api/v1/admin/auth/get-profile', data)
// }

// export function editProfile(data) {
//   return axiosClient.post('/api/v1/admin/auth/edit-profile', data)
// }


//============================================================================//
//============================ user api end  =================================//
//============================================================================//


//============================ dashboard api start=================================//

export function dashboard(data) {
  return axiosClient.post('/lea-training/v1/admin/dashboard/admin-dashboard', data)
}

export function countryList(data) {
  return axiosClient.post('/lea-training/v1/admin/dashboard/country-list', data)
}

export function cityList(data) {
  return axiosClient.post('/lea-training/v1/admin/dashboard/city-list', data)
}

//============================ dashboard api end  =================================//

//============================ User modules api start=================================//

export function userList(data) {
  return axiosClient.post('/lea-training/v1/admin/user/user-list', data)
}

export function addSingleUser(data) {
  return axiosClient.post('/lea-training/v1/admin/user/add-user', data)
}

export function addBulkUser(data) {
  return axiosClient.post('/lea-training/v1/admin/user/add-bulk-users', data)
}

export function updateSingleUser(data) {
  return axiosClient.post('/lea-training/v1/admin/user/update-user', data)
}
export function deleteSingleUser(data) {
  return axiosClient.post('/lea-training/v1/admin/user/delete-user', data)
}

export function changeSingleUserStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/user/change-user-status', data)
}

//============================ User modules api end  =================================//

//============================ Trainer modules api start=================================//

export function trainerList(data) {
  return axiosClient.post('/lea-training/v1/admin/trainer/trainer-list', data)
}

export function addSingleTrainer(data) {
  return axiosClient.post('/lea-training/v1/admin/trainer/add-single-trainer', data)
}

export function addBulkTrainer(data) {
  return axiosClient.post('/lea-training/v1/admin/trainer/add-bulk-trainers', data)
}

export function updateSingleTrainer(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/trainer/update-trainer', data)
}
export function deleteSingleTrainer(data) {
  return axiosClient.post('/lea-training/v1/admin/trainer/delete-trainer', data)
}

export function changeSingleTrainerStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/trainer/change-trainer-status', data)
}

//============================ Trainer modules api end  =================================//
//============================ Category modules api start=================================//

export function categoryList(data) {
  return axiosClient.post('/lea-training/v1/admin/category/category-list', data)
}

export function addSingleCategory(data) {
  return axiosClient.post('/lea-training/v1/admin/category/add-category', data)
}

export function updateSingleCategory(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/category/update-category', data)
}
export function deleteSingleCategory(data) {
  return axiosClient.post('/lea-training/v1/admin/category/delete-category', data)
}

export function changeSingleCategoryStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/category/change-category-status', data)
}

//============================ Category modules api end  =================================//
//============================ Course modules api start=================================//

export function courseList(data) {
  return axiosClient.post('/lea-training/v1/admin/course/course-list', data)
}

export function addSingleCourse(data) {
  return axiosClient.post('/lea-training/v1/admin/course/add-course', data)
}

export function updateSingleCourse(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/course/update-course', data)
}
export function deleteSingleCourse(data) {
  return axiosClient.post('/lea-training/v1/admin/course/delete-course', data)
}

export function changeSingleCourseStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/course/change-course-status', data)
}

export function lessionList(data) {
  return axiosClient.post('/lea-training/v1/admin/course/lession-list', data)
}

export function addSingleLession(data) {
  return axiosClient.post('/lea-training/v1/admin/course/add-lession', data)
}

export function updateSingleLession(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/course/update-lession', data)
}
export function deleteSingleLession(data) {
  return axiosClient.post('/lea-training/v1/admin/course/delete-lession', data)
}

export function changeSingleLessionStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/course/change-lession-status', data)
}

export function enrollUserList(data) {
  return axiosClient.post('/lea-training/v1/admin/course/enroll-course-users', data)
}

export function courseReviewList(data) {
  return axiosClient.post('/lea-training/v1/admin/course/course-review-list', data)
}

export function assignSingleCourse(data) {
  return axiosClient.post('/lea-training/v1/admin/course/assign-course', data)
}
//============================ Course modules api end  =================================//
//============================ Test modules api start=================================//

export function testList(data) {
  return axiosClient.post('/lea-training/v1/admin/test/test-list', data)
}

export function addSingleTest(data) {
  return axiosClient.post('/lea-training/v1/admin/test/add-test', data)
}

export function updateSingleTest(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/test/update-test', data)
}
export function deleteSingleTest(data) {
  return axiosClient.post('/lea-training/v1/admin/test/delete-test', data)
}

export function changeSingleTestStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/test/change-test-status', data)
}

export function questionList(data) {
  return axiosClient.post('/lea-training/v1/admin/test/question-list', data)
}

export function addSingleQuestion(data) {
  return axiosClient.post('/lea-training/v1/admin/test/add-single-question', data)
}

export function addBulkQuestion(data) {
  return axiosClient.post('/lea-training/v1/admin/test/add-bulk-question', data)
}

export function updateSingleQuestion(data) {
  return axiosClient.post('/lea-training/v1/admin/test/update-question', data)
}

export function deleteSingleQuestion(data) {
  return axiosClient.post('/lea-training/v1/admin/test/delete-question', data)
}

export function deleteBulkQuestion(data) {
  return axiosClient.post('/lea-training/v1/admin/test/delete-bulk-question', data)
}

export function changeSingleQuestionStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/test/change-question-status', data)
}

export function attemptUserList(data) {
  return axiosClient.post('/lea-training/v1/admin/test/test-attempt-users', data)
}
//============================ Test modules api end  =================================//
//============================ Discount modules api start=================================//

export function discountList(data) {
  return axiosClient.post('/lea-training/v1/admin/discount/discount-code-list', data)
}

export function addSingleDiscount(data) {
  return axiosClient.post('/lea-training/v1/admin/discount/add-discount-code', data)
}

export function updateSingleDiscount(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/discount/update-discount-code', data)
}
export function deleteSingleDiscount(data) {
  return axiosClient.post('/lea-training/v1/admin/discount/delete-discount-code', data)
}

export function changeSingleDiscountStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/discount/change-discount-code-status', data)
}

export function discountUsageList(data) {
  return axiosClient.post('/lea-training/v1/admin/discount/discount-usage', data)
}

//============================ Discount modules api end  =================================//
//============================ Corporate profile modules api start=================================//

export function corporateProfileList(data) {
  return axiosClient.post('/lea-training/v1/admin/corporate/corporate-profile-list', data)
}

export function addSingleCorporateProfile(data) {
  return axiosClient.post('/lea-training/v1/admin/corporate/add-corporate-profile', data)
}

export function singleCourseAssignToUser(data) {
  return axiosClient.post('/lea-training/v1/admin/corporate/course-assign-to-user', data)
}

//============================ Corporate profile modules api end  =================================//
//============================ Subadmin modules api start=================================//

export function subadminList(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/subadmin-list', data)
}

export function addSingleSubadmin(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/add-subadmin', data)
}

export function updateSingleSubadmin(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/update-subadmin', data)
}

export function deleteSingleSubadmin(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/delete-subadmin', data)
}

export function changeSingleSubadminStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/change-subadmin-status', data)
}

export function permissionModuleList(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/permission-modules', data)
}

export function subadminPermissionList(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/subadmin-permission-list', data)
}

export function addPermissionApi(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/add-permission', data)
}

export function updatePermissionApi(data) {
  return axiosClient.post('/lea-training/v1/admin/subadmin/update-permission', data)
}

//============================ Subadmin modules api end  =================================//
//============================ Language modules api start=================================//

export function languageList(data) {
  return axiosClient.post('/lea-training/v1/admin/language/language-list', data)
}

export function addSingleLanguage(data) {
  return axiosClient.post('/lea-training/v1/admin/language/add-language', data)
}

export function updateSingleLanguage(data) {
  // console.log(data,"api handle");
  return axiosClient.post('/lea-training/v1/admin/language/update-language', data)
}
export function deleteSingleLanguage(data) {
  return axiosClient.post('/lea-training/v1/admin/language/delete-language', data)
}

export function changeSingleLanguageStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/language/change-language-status', data)
}

//============================ Language modules api end  =================================//
//============================ CommunityForum modules api start=================================//

export function communityForumList(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/community-forum-list', data)
}

export function communityForumAnswerList(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/community-forum-answer-list', data)
}

export function addSingleCommunityForumAnswer(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/add-coomunity-forum-answer', data)
}

export function updateSingleCorrectAnswer(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/update-correct-answer', data)
}

//============================ CommunityForum modules api end  =================================//
//============================ Blogs modules api start=================================//

export function blogList(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/blog-list', data)
}

export function addSingleBlog(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/add-blog', data)
}

export function updateSingleBlog(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/update-blog', data)
}

export function deleteSingleBlog(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/delete-blog', data)
}

export function changeSingleBlogStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/community-forum/change-blog-status', data)
}

//============================ blogs modules api end  =================================//
//============================ Animated video modules api start=================================//

export function animatedVideoList(data) {
  return axiosClient.post('/lea-training/v1/admin/animated-video/animated-video-list', data)
}

export function addSingleAnimatedVideo(data) {
  return axiosClient.post('/lea-training/v1/admin/animated-video/add-animated-video', data)
}

export function updateSingleAnimatedVideo(data) {
  return axiosClient.post('/lea-training/v1/admin/animated-video/update-animated-video', data)
}

export function deleteSingleAnimatedVideo(data) {
  return axiosClient.post('/lea-training/v1/admin/animated-video/delete-animated-video', data)
}

export function changeSingleAnimatedVideoStatus(data) {
  return axiosClient.post('/lea-training/v1/admin/animated-video/change-animated-video-status', data)
}

//============================ Animated video modules api end  =================================//
//============================ CMS modules api start=================================//

export function cmsList(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/cms-list', data)
}

export function addUpdateSingleCMS(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/add-update-cms', data)
}

export function deleteSingleCMS(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/delete-cms', data)
}

export function addUpdateSingleFAQ(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/add-update-faq', data)
}

export function faqList(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/faq-list', data)
}

export function contactUsList(data) {
  return axiosClient.post('/lea-training/v1/admin/cms/contact-us-list', data)
}

//============================ CMS modules api end  =================================//