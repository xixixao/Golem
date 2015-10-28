{_div, _p, _table, _tbody, _tr, _th, _td, _code, _span} = require 'hyper'

sortBy = (array, property) ->
  array.slice().sort (a, b) ->
    if (a[property] > b[property])
      1
    else if (a[property] < b[property])
      -1
    else
      0

_ProjectsBrowser = hyper class ProjectsBrowser

  handleClick: (name) -> (event) =>
    @props.editor.switchProject name

  handleChange: ->
    @setState
      data: @props.memory.projects()
      projectName: @props.memory.project.name

  componentWillMount: ->
    @handleChange()

  componentDidMount: ->
    @props.memory.on 'projectTable', @handleChange
    @props.memory.on 'fileTable', @handleChange

  componentWillUnmount: ->
    @props.memory.off 'projectTable', @handleChange
    @props.memory.off 'fileTable', @handleChange

  render: ->
    data = sortBy (file for _, file of @state.data), 'name'
    _table _tbody {},
      _tr _th(),
        _th 'Name'
      for {name, numLines} in data
        _tr
          key: name
          className: 'colorHighlightHover'
          onClick: @handleClick(name)
          style: cursor: 'pointer'
          _td if name is @state.projectName then '> ' else '  '
          _td "#{name} "

_ProjectBrowser = hyper class ProjectBrowser

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


class SetProjectCommand
  @defaultSymbols = ['project']
  @description = 'Load or create a project of given name.'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    editor.displayMessage 'file', "Project #{name} loaded."
    editor.switchProject name

class ListProjectsCommand
  @defaultSymbols = ['projects']
  @description = 'Show all saved projects.'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _ProjectsBrowser editor: editor, memory: editor.memory

class BrowseProjectCommand
  @defaultSymbols = ['modules', 'm']
  @description = 'Show modules in current project.'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _ProjectBrowser editor: editor, memory: editor.memory

class ExportModuleCommand
  @defaultSymbols = ['export']
  @description = 'Toggle whether current module is exported'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    name = state.module.moduleName
    editor.memory.removeFromClient name
    state.mode.flipExported()
    editor.save name
    editor.displayMessage 'file',
      "Module #{name} #{if state.mode.exported then '' else 'un'}exported."

module.exports = [BrowseProjectCommand, ExportModuleCommand, SetProjectCommand, ListProjectsCommand]
