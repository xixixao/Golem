gui = undefined

maximizeWindow = ->
  window = gui.Window.get()
  window.maximize()

createProjectMenu = ->
  mainMenu = new gui.Menu type: 'menubar'
  mainMenu.createMacBuiltin "Golem"

  # TODO: support opening files via a fake input field
  fileMenu = menu 'File',
    label: 'Open...'
    click: ->
      alert "not supported yet"
  ,
    label: 'Open Project...'
    click: ->
      alert "not supported yet"
  ,
    label: 'Open Test...'
    click: ->
      alert "not supported yet"
  mainMenu.insert fileMenu, 1
  gui.Window.get().menu = mainMenu

menu = (label, items...) ->
  newMenu = new gui.Menu()
  itemForMenu = new gui.MenuItem label: label
  for item in items
    newMenu.append new gui.MenuItem item
  itemForMenu.submenu = newMenu
  itemForMenu

setFilePath = ->
  window.GolemOpenFilePath = gui.App.argv[0]

if window.require
  gui = require 'nw.gui'
  maximizeWindow()
  createProjectMenu()
  setFilePath()
