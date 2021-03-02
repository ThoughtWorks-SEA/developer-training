// Target
function networkFetch(url) {
  return `${url} - Response from network`;
}

const cache = [];
const proxiedNetworkFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const urlParam = args[0];
    if (cache.includes(urlParam)) {
      return `${urlParam} - Response from cache`;
    } else {
      cache.push(urlParam);
      return Reflect.apply(target, thisArg, args);
    }
  },
});

//In one module
function profileImages(profileId) {
  return proxiedNetworkFetch(baseProfileUrl + profileId);
}

//In another module
function bannerImages(profileId) {
  return proxiedNetworkFetch(baseBannerUrl + profileId);
}
