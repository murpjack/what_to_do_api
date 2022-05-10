const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} = require('quicktype-core');

const fs = require('fs-extra');
const {
  map,
  chain,
  encaseP,
  fork,
  node,
  parallel,
} = require('fluture');

const readdirF = (dir, opts) => node((d) => fs.readdir(dir, opts, d));

const readJsonF = encaseP(fs.readJson);

const makeTypes = (data) => {
  const jsonString = JSON.stringify(data);
  const fileName = Object.keys(data[0])[0];
  makeElmTypes(jsonString, {
    path: 'types/',
    name: fileName,
    ext: '.elm',
  });
  makeTypeScriptTypes(jsonString, {
    path: 'src/types/',
    name: fileName,
    ext: '.ts',
  });
};

const seedsPath = 'src/seeds/';
readdirF(seedsPath, {})
  .pipe(
    chain((arr) =>
      parallel(arr.length)(
        arr.map((fileName) => readJsonF(seedsPath + fileName)),
      ),
    ),
  )
  .pipe(fork(console.error)(makeTypes));

const makeElmTypes = (jsonString, fileMeta) =>
  encaseP(quicktypeJson)({
    targetLanguage: 'elm',
    typeName: fileMeta.name,
    opts: {
      rendererOptions: {
        'just-types': true,
      },
    },
    jsonString,
  }).pipe(handleJson(fileMeta));

const makeTypeScriptTypes = (jsonString, fileMeta) =>
  encaseP(quicktypeJson)({
    targetLanguage: 'typescript',
    typeName: fileMeta.name,
    opts: {
      rendererOptions: {
        'just-types': true,
      },
    },
    jsonString,
  }).pipe(handleJson(fileMeta));

const quicktypeJson = async ({
  targetLanguage,
  typeName,
  opts,
  jsonString,
}) => {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

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
};

const handleJson = ({ path, name, ext }) => (q) =>
  q
    .pipe(map(({ lines }) => lines.join('\n')))
    .pipe(map((types) => fs.outputFile(path + name + ext, types)))
    .pipe(map(() => 'Updated ' + path + name + ext))
    .pipe(fork(console.error)(console.log));
