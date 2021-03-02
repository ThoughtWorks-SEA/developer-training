function networkFetch(url) {
  return `${url} - Response from network`;
}

//In one module
function profileImages(profileId) {
  return networkFetch(baseProfileUrl + profileId);
}

//In another module
function bannerImages(profileId) {
  return networkFetch(baseBannerUrl + profileId);
}
