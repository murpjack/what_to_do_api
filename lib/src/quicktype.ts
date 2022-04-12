import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from 'quicktype-core';

import * as data from '../../src/seeds/hospitality_venue.seed.json';

async function quicktypeJSON(targetLanguage, typeName, jsonString, opts = {}) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    ...opts,
  });
}

async function main() {
  const opts = {
    rendererOptions: {
      'just-types': true,
    },
  };

  const jsonString = JSON.stringify(data);

  const elm = await quicktypeJSON('elm', 'Person', jsonString, opts);
  console.log(elm.lines.join('\n'));

  const ts = await quicktypeJSON('typescript', 'Person', jsonString, opts);
  console.log(ts.lines.join('\n'));
}

main();
