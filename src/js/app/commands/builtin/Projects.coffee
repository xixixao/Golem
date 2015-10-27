{_div, _p, _table, _tbody, _tr, _th, _td, _code, _span} = require 'hyper'

sortBy = (array, property) ->
  array.slice().sort (a, b) ->
    if (a[property] > b[property])
      1
    else if (a[property] < b[property])
      -1
    else
      0

# class SaveCommand
#   @defaultSymbols = ['save']
#   @description = 'Save current code locally under name.'
#   @symbols = @defaultSymbols

#   @execute = ([name], state, editor) ->
#     editor.displayMessage 'file', "#{name} saved."
#     editor.save name

# class LoadCommand
#   @defaultSymbols = ['load', 'l']
#   @description = 'Load code from local storage under name.'
#   @symbols = @defaultSymbols
#   @autocomplete = fileAutocomplete no

#   @execute = ([name], state, editor) ->
#     loaded = editor.load name, true
#     if loaded
#       editor.displayMessage 'file', "#{name} loaded."
#     else
#       editor.displayMessage 'file', "There is no #{name}."

# class RenameCommand
#   @defaultSymbols = ['rename']
#   @description = 'Rename code under some name to a different name.'
#   @symbols = @defaultSymbols
#   @autocomplete = fileAutocomplete yes

#   @execute = ([fromName, toName], state, editor) ->
#     loaded = editor.load fromName, true
#     if not loaded
#       editor.displayMessage 'file', "There is no #{name}."
#       return
#     editor.save toName
#     editor.memory.removeFromClient fromName
#     editor.displayMessage 'file', "#{fromName} renamed to #{toName}."
#     editor.save name

# class DeleteCommand
#   @defaultSymbols = ['delete']
#   @description = 'Remove code from local storage'
#   @symbols = @defaultSymbols
#   @autocomplete = fileAutocomplete yes

#   @execute = ([name], state, editor) ->
#     editor.displayMessage 'file', "#{name} deleted."
#     editor.memory.removeFromClient name
#     {}

# class CloseCommand
#   @defaultSymbols = ['close']
#   @description = 'Stops saving under current name.'
#   @symbols = @defaultSymbols

#   @execute = ([name], state, editor) ->
#     editor.displayMessage 'file', "File closed."
#     # editor.save "@unnamed"
#     # editor.empty()
#     editor.load "@unnamed"
#     {}

_ProjectBrowser = hyper class ProjectBrowser

  # getInitialState: ->
  #   data:
  #     A:
  #       name: 'A'
  #       children:
  #         B:
  #           name: 'A/B'
  #           children:
  #             C: name: 'A/B/C'
  #             D: name: 'A/B/D'
  #         F: name: 'A/F'

  handleClick: (name, exists) -> (event) =>
    @props.editor.executeCommand (if exists then 'load' else 'new'), name

  handleChange: ->
    @setState
      data: @props.memory.getModuleTree()
      fileName: @props.memory.getLastOpenFileName()

  componentWillMount: ->
    @handleChange()

  componentDidMount: ->
    @props.memory.on 'fileTable', @handleChange
    @props.memory.on 'lastOpen', @handleChange

  componentWillUnmount: ->
    @props.memory.off 'fileTable', @handleChange
    @props.memory.off 'lastOpen', @handleChange


  subtree: (data, index) ->
    for moduleName, {name, children, exists, exported} of data
      children ?= {}
      _div
        key: moduleName
        _div
          className: 'colorHighlightHover'
          style:
            opacity: (if not exists then 0.5 else 1)
            cursor: (if exists then 'pointer' else 'alias')
          onClick: (@handleClick name, exists)
          if name is @state.fileName then '> ' else '  '
          ((Array index + 1).join '  ') + moduleName
          if exported then ' +' else ''
        _div
          @subtree children, index + 1

  render: ->
    _div {},
      _span
        style: fontWeight: 'bold'
        "Modules"
      _div
        @subtree @state.data, 0



    # data = sortBy (file for _, file of @state.data), 'name'
    # if data.length is 0
    #   _div "No files found"
    # else
    #   _table _tbody {},
    #     _tr _th(),
    #       _th 'Name'
    #       _th 'Lines'
    #     for {name, numLines} in data
    #       _tr
    #         key: name
    #         className: 'colorHighlightHover'
    #         onClick: @handleClick(name)
    #         style: cursor: 'pointer'
    #         _td if name is @state.fileName then '> ' else '  '
    #         _td "#{name} "
    #         _td numLines

class ProjectCommand
  @defaultSymbols = ['project']
  @description = 'Show modules in current project'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _ProjectBrowser editor: editor, memory: editor.memory

module.exports = [ProjectCommand]
