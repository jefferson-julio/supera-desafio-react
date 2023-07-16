import { defineConfig } from "cypress";
import { mock } from 'intermock'
import fs from 'fs'

const generateFakeModel = (modelName: string) => {
  const modelFile = `./src/app/model/${modelName}.ts`
  const mockedData = mock({
    files: [[modelFile, fs.readFileSync(modelFile).toString()]],
    interfaces: [modelName]
  })
  return mockedData;
}

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      on('task', {
        generateFakeModel(modelName: string) {
          console.log('RAMO SIMBORA')
          return generateFakeModel(modelName)
        },
      })
    }
  },
});
