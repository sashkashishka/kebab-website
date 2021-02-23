import getRandomInt from './get-random';


const ukr = [1110, 1111];
const rus = [1098, 1099, 1101];


for (let i = 1072; i < 1103; i += 1) {
  if (rus.includes(i)) {
    continue;
  }
  ukr.push(i);
}


function generateWords(w, lineLength = 35) {
  let before = '';
  let after = '';
  const wordPos = getRandomInt(0, lineLength - w.length);

  for (let k = 0; k <= lineLength; k += 1) {
    if (wordPos === k) {
      k += w.length;
      continue;
    }

    if (k < wordPos) {
      before += String.fromCharCode(ukr[getRandomInt(0, ukr.length)]);
    }

    if (k > wordPos) {
      after += String.fromCharCode(ukr[getRandomInt(0, ukr.length)]);
    }
  }

  return {
    w,
    before,
    after,
  };
}

export default generateWords;
