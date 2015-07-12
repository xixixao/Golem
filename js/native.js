var createProjectMenu, maximizeWindow, setFilePath;

maximizeWindow = function() {
  var gui, window;
  gui = require('nw.gui');
  window = gui.Window.get();
  return window.maximize();
};

createProjectMenu = function() {
  var gui, mainMenu;
  gui = require('nw.gui');
  mainMenu = new gui.Menu({
    type: 'menubar'
  });
  mainMenu.createMacBuiltin("Golem");
  return gui.Window.get().menu = mainMenu;
};

setFilePath = function() {
  var gui;
  gui = require('nw.gui');
  return window.GolemOpenFilePath = gui.App.argv[0];
};

if (window.require) {
  maximizeWindow();
  createProjectMenu();
  setFilePath();
}
