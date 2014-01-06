{_div, _p, _table, _tbody, _tr, _th, _td, _code} = require 'hyper'

class SaveCommand
  @defaultSymbols = ['save']
  @description = 'Save current code locally under name.'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    editor.displayMessage 'file', "#{name} saved."
    editor.refs.sourceEditor.save name

class LoadCommand
  @defaultSymbols = ['load']
  @description = 'Load code from local storage under name'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    loaded = editor.refs.sourceEditor.load name, true
    if loaded
      editor.displayMessage 'file', "#{name} loaded."
    else
      editor.displayMessage 'file', "There is no #{name}."

class DeleteCommand
  @defaultSymbols = ['delete']
  @description = 'Remove code from local storage'
  @symbols = @defaultSymbols

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
    editor.refs.sourceEditor.save "@unnamed"
    {}

_FileBrowser = hyper class FileBrowser

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
    console.log @state.data
    data = Object.values(@state.data).sortBy 'name'
    _table _tbody {},
      _tr _th(),
        _th 'Name'
        _th 'Lines'
      for {name, numLines} in data
        _tr key: name,
          _td if name is @state.fileName then '>'
          _td name
          _td numLines

class BrowseCommand
  @defaultSymbols = ['browse', 'b']
  @description = 'Show content of local storage'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _FileBrowser memory: editor.memory

module.exports = [SaveCommand, LoadCommand, DeleteCommand, BrowseCommand, CloseCommand]
