maximizeWindow = ->
  gui = require 'nw.gui'
  window = gui.Window.get()
  window.maximize()

createProjectMenu = ->
  gui = require 'nw.gui'
  mainMenu = new gui.Menu type: 'menubar'
  mainMenu.createMacBuiltin "Golem"

  # Create Projects Menu and Item to point to it
  projectMenu = new gui.Menu()
  projectsItem = new gui.MenuItem label: 'Project'
  # projectMenu.append new gui.MenuItem label: 'New Project'
  projectMenu.append new gui.MenuItem
    label: 'Open Project...'
    click: ->
      # TODO: support opening files via a fake input field
  # projectMenu.append new gui.MenuItem type: 'separator'
  # projectMenu.append new gui.MenuItem label: 'Item C'
  projectsItem.submenu = projectMenu
  mainMenu.insert projectsItem, 1
  gui.Window.get().menu = mainMenu

if window.require
  maximizeWindow()
  # createProjectMenu()
