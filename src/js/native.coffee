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
      fileDialog multiple: yes, ([filepath]) ->
        console.log filepath
  ,
    label: 'Open Project...'
    click: ->
      fileDialog accept: ".golem-project", ([filepath]) ->
        console.log filepath
  ,
    label: 'Open Test...'
    click: ->
      fileDialog multiple: yes, ([filepath]) ->
        console.log filepath
  mainMenu.insert fileMenu, 1
  gui.Window.get().menu = mainMenu

fileDialog = (attributes, callback) ->
  attrs = (for name, value of attributes
    if value is yes
      name
    else
      "#{name}=\"#{value}\"").join ' '
  wrapper = document.createElement 'div'
  wrapper.style.display = "none"
  wrapper.innerHTML = """<input type="file" style="display: none" #{attrs} />"""
  document.body.appendChild wrapper
  chooser = wrapper.firstChild
  chooser.addEventListener "change", (evt) ->
    callback (path for {path} in chooser.files)
    document.body.removeChild wrapper
  , false
  chooser.click()

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
