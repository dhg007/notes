const child_process = require('child_process');

function qryStashIds() {
  return new Promise((resolve, reject) => {
    child_process.exec('git fsck --lost-found', { encoding: 'utf8' }, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      // 筛选出dangling commit的id
      let matches = stdout.match(/commit\s+([^\s\r\n]+)/g);
      if (matches) {
        matches = matches.map(m => m.replace(/commit\s+/, ''));
        resolve(matches);
      }
    });
  });
}

function isMaps(id) {
  return new Promise(resolve => {
    child_process.exec('git show ' + id, { encoding: 'utf8' }, (err, stdout) => {
      if (err) {
        return resolve([]);
      }

      // 找到 merge 的 id ， 内容是 Merge: 546546 fsfs6a54 fsd4645f6\n blabla
      let arr = [id];
      let ms = stdout.match(/Merge:\s+([\s\S]+?)\n/);
      if (ms && ms[1]) {
        arr = [...arr, ...ms[1].split(' ')];
      }

      resolve(arr);
    });
  });
}

function findIdByText(id) {
  return new Promise(resolve => {
    child_process.exec('git show ' + id, { encoding: 'utf8' }, (err, stdout) => {
      if (err) {
        return resolve([]);
      }

      let arr = [];
      let ms2 = stdout.match(/test-pages\//);

      if (ms2) {
        console.log(111, id);
      }

      resolve(arr);
    });
  });
}

async function matchRevertStashId() {
  const stashIds = await qryStashIds();
  let arr = await Promise.all(stashIds.map(id => isMaps(id)));
  arr = arr.flat();
  await Promise.all(arr.map(id => findIdByText(id)));
}

matchRevertStashId();