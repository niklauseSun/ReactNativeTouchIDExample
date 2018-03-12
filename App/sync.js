let SYNC = {}

SYNC.user3 = (params) => {
  if (params == null) {
    return;
  }

  let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag }} = fetch('user/', {
    method: 'GET',
    body: 'id=' + id,
    ...extraFetchOptions,
  }).then(response => {
    // console.log(json);
    if (json && json.user) {
      storage.save({
        key: 'user',
        id,
        data: json.user
      });

      if (someFlag) {

      }
      resolve && resolve(json.user);
    } else {
      // 失败则调用reject
      reject && reject(new Error('data parse error'));
    }
  }).catch(err => {
    console.warn(err);
    reject && reject(err);
  });
}

export default SYNC
