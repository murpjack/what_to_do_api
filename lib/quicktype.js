const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} = require("quicktype-core");

const fs = require('fs-extra')

/** 
 - [x] find a list of files
 - [x] read each {.json} file 
 - [x] generate types from single json datasource
 - [ ] fluture to better handle errors?
*/

const basePath = "src/seeds/"

fs.readdir(basePath, {}, (err, arr) => {
  if (err) {
    return "Error reading dir";
  } else {
    arr.map(fileName => 
      fs.readJson(basePath + fileName)
        .then(makeTypes));
  }
});

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

const makeTypes = data => {
  const jsonString = JSON.stringify(data);  

  makeElmTypes(jsonString);

  makeTypeScriptTypes(jsonString);  

  return data;
}

const makeElmTypes = jsonString => 
  quicktypeJSON('elm', 
    'Person', 
    jsonString, 
    {
      rendererOptions: {
        'just-types': true,
      },
    })
    .then(elm => elm.lines.join('\n'))
    .then(types => fs.outputFile("types.elm", types))
    .then(err => {
      if (!err) {
        console.log(`Created ${"name"} successfully!`)
      }
    });

const makeTypeScriptTypes = jsonString => 
  quicktypeJSON(
      'typescript',
      'Person',
      jsonString,
      {
        rendererOptions: {
          'just-types': true,
        },
      },
    )
    .then(ts => ts.lines.join('\n'))
    .then(types => fs.outputFile("types.ts", types))
    .then(err => {
      if (!err) {
        console.log(`Created ${"name"} successfully!`)
      }
    })
    