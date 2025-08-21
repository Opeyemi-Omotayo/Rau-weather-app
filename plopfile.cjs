module.exports = (plop) => {
  // Plop generator for components
  plop.setGenerator('component', {
    description: 'Create a new React component without styles',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/custom/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
    ],
  });
};