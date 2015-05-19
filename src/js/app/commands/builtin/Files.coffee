{_div, _p, _table, _tbody, _tr, _th, _td, _code} = require 'hyper'

# Autocompletion for first arguments, which is a file name
fileAutocomplete = (args, state, editor, callback) ->
  if args.length <= 1
    callback null, (for key, {name, numLines} of editor.memory.getFileTable()
      name: name
      value: name
      meta: "#{numLines}")

class SaveCommand
  @defaultSymbols = ['save']
  @description = 'Save current code locally under name.'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    editor.displayMessage 'file', "#{name} saved."
    editor.save name

class LoadCommand
  @defaultSymbols = ['load', 'l']
  @description = 'Load code from local storage under name.'
  @symbols = @defaultSymbols
  @autocomplete = fileAutocomplete

  @execute = ([name], state, editor) ->
    loaded = editor.load name, true
    if loaded
      editor.displayMessage 'file', "#{name} loaded."
    else
      editor.displayMessage 'file', "There is no #{name}."

class RenameCommand
  @defaultSymbols = ['rename']
  @description = 'Rename code under some name to a different name.'
  @symbols = @defaultSymbols
  @autocomplete = fileAutocomplete

  @execute = ([fromName, toName], state, editor) ->
    loaded = editor.load fromName, true
    if not loaded
      editor.displayMessage 'file', "There is no #{name}."
      return
    editor.save toName
    editor.memory.removeFromClient fromName
    editor.displayMessage 'file', "#{fromName} renamed to #{toName}."
    editor.save name

class DeleteCommand
  @defaultSymbols = ['delete']
  @description = 'Remove code from local storage'
  @symbols = @defaultSymbols
  @autocomplete = fileAutocomplete

  @execute = ([name], state, editor) ->
    editor.displayMessage 'file', "#{name} deleted."
    editor.memory.removeFromClient name
    {}

class CloseCommand
  @defaultSymbols = ['close']
  @description = 'Stops saving under current name.'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    editor.displayMessage 'file', "File closed."
    # editor.save "@unnamed"
    # editor.empty()
    editor.load "@unnamed"
    {}

_FileBrowser = hyper class FileBrowser

  handleClick: (name) -> (event) =>
    @props.editor.executeCommand 'load', name

  handleChange: ->
    @setState
      data: @props.memory.getFileTable()
      fileName: @props.memory.getLastOpenFileName()

  componentWillMount: ->
    @handleChange()

  componentDidMount: ->
    @props.memory.on 'fileTable', @handleChange
    @props.memory.on 'lastOpen', @handleChange

  componentWillUnmount: ->
    @props.memory.off 'fileTable', @handleChange
    @props.memory.off 'lastOpen', @handleChange

  render: ->
    data = Object.values(@state.data).sortBy 'name'
    if data.length is 0
      _div "No files found"
    else
      _table _tbody {},
        _tr _th(),
          _th 'Name'
          _th 'Lines'
        for {name, numLines} in data
          _tr
            key: name
            onClick: @handleClick(name)
            style: cursor: 'pointer'
            _td if name is @state.fileName then '>'
            _td "#{name} "
            _td numLines

class BrowseCommand
  @defaultSymbols = ['browse', 'b']
  @description = 'Show content of local storage'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _FileBrowser editor: editor, memory: editor.memory

module.exports = [SaveCommand, LoadCommand, RenameCommand, DeleteCommand, BrowseCommand, CloseCommand]
