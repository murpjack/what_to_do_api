const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} = require('quicktype-core');

const fs = require('fs-extra');
const {
  map,
  chain,
  resolve,
  encaseP,
  Future,
  fork,
  node,
  parallel,
} = require('fluture');
const R = require('ramda');

const readdirF = (dirName, opts) =>
  node((done) => fs.readdir(dirName, opts, done));

const readJsonF = encaseP(fs.readJson);

const seedsPath = 'src/seeds/';
readdirF(seedsPath, {})
  .pipe(
    map((arr) =>
      arr.map((fileName) => readJsonF(seedsPath + fileName)),
    ),
  )
  // TODO: connect below forks into one fork
  .pipe(
    map((arr) =>
      parallel(arr.length)(arr).pipe(fork(console.error)(makeTypes)),
    ),
  )
  .pipe(fork(console.error)(console.log));

async function quicktypeJSON(
  targetLanguage,
  typeName,
  jsonString,
  opts = {},
) {
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

const makeTypes = (data) => {
  const jsonString = JSON.stringify(data);

  makeElmTypes(jsonString);

  makeTypeScriptTypes(jsonString);

  return data;
};

const makeElmTypes = (jsonString) =>
  quicktypeJSON('elm', 'Person', jsonString, {
    rendererOptions: {
      'just-types': true,
    },
  })
    .then((elm) => elm.lines.join('\n'))
    .then((types) => fs.outputFile('types.elm', types))
    .then((err) => {
      if (!err) {
        console.log(
          `Created ${'path/to/fileName.elm'} successfully!`,
        );
      }
    });

const makeTypeScriptTypes = (jsonString) =>
  quicktypeJSON('typescript', 'Person', jsonString, {
    rendererOptions: {
      'just-types': true,
    },
  })
    .then((ts) => ts.lines.join('\n'))
    // .then(types => fs.outputFile("src/" + fileName, types))
    .then((types) => fs.outputFile('types.ts', types))
    .then((err) => {
      if (!err) {
        console.log(`Created ${'fileName.ts'} successfully!`);
      }
    });
