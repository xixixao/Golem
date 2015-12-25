((root, factory) ->
  if typeof define == 'function' and define.amd
    # AMD. Register as an anonymous module.
    define [], factory
  else if typeof module == 'object' and module.exports
    # Node. Does not work with strict CommonJS, but
    # only CommonJS-like environments that support module.exports,
    # like Node.
    module.exports = factory()
  else
    # Browser globals (root is window)
    root.returnExports = factory()
  return
) this, ->

  FILE = 0x8000
  DIRECTORY = 0x4000

  # Same as stats
  class LFSNode
    constructor: (@size, @mode, @atime, @mtime, @ctime) ->

    # Returns whether something changed
    update: ({size, mode, atime, mtime, ctime}) ->
      hasChanged = false

      hasChanged or= @size isnt size
      @size = size

      hasChanged or= @mode isnt mode
      @mode = mode

      hasChanged or= +@atime isnt +atime
      @atime = atime

      hasChanged or= +@mtime isnt +mtime
      @mtime = mtime

      hasChanged or= +@ctime isnt +ctime
      @ctime = ctime

      return hasChanged

    isFile: ->
      return @mode & 0xF000 == FILE

    isDirectory: ->
      return @mode & 0xF000 == DIRECTORY


  class FileIndex

    constructor: ->
    # paths to DirectoryNodes
      @_index = {}


  # /**
  #  * Adds the given absolute path to the index if it is not already in the index.
  #  * Creates any needed parent directories.
  #  * @param [String] path The path to add to the index.
  #  * @param [BrowserFS.FileInode | BrowserFS.DirInode] inode The inode for the
  #  *   path to add.
  #  * @return [Boolean] 'True' if it was added or already exists, 'false' if there
  #  *   was an issue adding it (e.g. item in path is a file, item exists but is
  #  *   different).
  #  * @todo If adding fails and implicitly creates directories, we do not clean up
  #  *   the new empty directories.
  #  */
#   addPath: (path, inode) ->
#     if (inode == null) {
#       throw new Error('Inode must be specified');
#     }
#     if (path[0] !== '/') {
#       throw new Error('Path must be absolute, got: ' + path);
#     }

#     // Check if it already exists.
#     if (this._index.hasOwnProperty(path)) {
#       return this._index[path] === inode;
#     }

#     var splitPath = this._split_path(path);
#     var dirpath = splitPath[0];
#     var itemname = splitPath[1];
#     // Try to add to its parent directory first.
#     var parent = this._index[dirpath];
#     if (parent === undefined && path !== '/') {
#       // Create parent.
#       parent = new DirInode();
#       if (!this.addPath(dirpath, parent)) {
#         return false;
#       }
#     }
#     // Add myself to my parent.
#     if (path !== '/') {
#       if (!parent.addItem(itemname, inode)) {
#         return false;
#       }
#     }
#     // If I'm a directory, add myself to the index.
#     if (!inode.isFile()) {
#       this._index[path] = <DirInode> inode;
#     }
#     return true;
#   }

#   /**
#    * Removes the given path. Can be a file or a directory.
#    * @return [BrowserFS.FileInode | BrowserFS.DirInode | null] The removed item,
#    *   or null if it did not exist.
#    */
#   public removePath(path: string): Inode {
#     var splitPath = this._split_path(path);
#     var dirpath = splitPath[0];
#     var itemname = splitPath[1];

#     // Try to remove it from its parent directory first.
#     var parent = this._index[dirpath];
#     if (parent === undefined) {
#       return null;
#     }
#     // Remove myself from my parent.
#     var inode = parent.remItem(itemname);
#     if (inode === null) {
#       return null;
#     }
#     // If I'm a directory, remove myself from the index, and remove my children.
#     if (!inode.isFile()) {
#       var dirInode = <DirInode> inode;
#       var children = dirInode.getListing();
#       for (var i = 0; i < children.length; i++) {
#         this.removePath(path + '/' + children[i]);
#       }

#       // Remove the directory from the index, unless it's the root.
#       if (path !== '/') {
#         delete this._index[path];
#       }
#     }
#     return inode;
#   }

#   /**
#    * Retrieves the directory listing of the given path.
#    * @return [String[]] An array of files in the given path, or 'null' if it does
#    *   not exist.
#    */
#   public ls(path: string): string[] {
#     var item = this._index[path];
#     if (item === undefined) {
#       return null;
#     }
#     return item.getListing();
#   }

#   /**
#    * Returns the inode of the given item.
#    * @param [String] path
#    * @return [BrowserFS.FileInode | BrowserFS.DirInode | null] Returns null if
#    *   the item does not exist.
#    */
#   public getInode(path: string): Inode {
#     var splitPath = this._split_path(path);
#     var dirpath = splitPath[0];
#     var itemname = splitPath[1];
#     // Retrieve from its parent directory.
#     var parent = this._index[dirpath];
#     if (parent === undefined) {
#       return null;
#     }
#     // Root case
#     if (dirpath === path) {
#       return parent;
#     }
#     return parent.getItem(itemname);
#   }

#   /**
#    * Static method for constructing indices from a JSON listing.
#    * @param [Object] listing Directory listing generated by tools/XHRIndexer.coffee
#    * @return [BrowserFS.FileIndex] A new FileIndex object.
#    */
#   public static from_listing(listing): FileIndex {
#     var idx = new FileIndex();
#     // Add a root DirNode.
#     var rootInode = new DirInode();
#     idx._index['/'] = rootInode;
#     var queue = [['', listing, rootInode]];
#     while (queue.length > 0) {
#       var inode;
#       var next = queue.pop();
#       var pwd = next[0];
#       var tree = next[1];
#       var parent = next[2];
#       for (var node in tree) {
#         var children = tree[node];
#         var name = "" + pwd + "/" + node;
#         if (children != null) {
#           idx._index[name] = inode = new DirInode();
#           queue.push([name, children, inode]);
#         } else {
#           // This inode doesn't have correct size information, noted with -1.
#           inode = new FileInode<node_fs_stats.Stats>(new Stats(node_fs_stats.FileType.FILE, -1, 0x16D));
#         }
#         if (parent != null) {
#           parent._ls[node] = inode;
#         }
#       }
#     }
#     return idx;
#   }
# }

/**
 * Generic interface for file/directory inodes.
 * Note that Stats objects are what we use for file inodes.
 */
export interface Inode {
  // Is this an inode for a file?
  isFile(): boolean;
  // Is this an inode for a directory?
  isDir(): boolean;
}

/**
 * Inode for a file. Stores an arbitrary (filesystem-specific) data payload.
 */
export class FileInode<T> implements Inode {
  constructor(private data: T) { }
  public isFile(): boolean { return true; }
  public isDir(): boolean { return false; }
  public getData(): T { return this.data; }
  public setData(data: T): void { this.data = data; }
}

/**
 * Inode for a directory. Currently only contains the directory listing.
 */
export class DirInode implements Inode {
  private _ls: {[path: string]: Inode} = {};
  /**
   * Constructs an inode for a directory.
   */
  constructor() {}
  public isFile(): boolean {
    return false;
  }
  public isDir(): boolean {
    return true;
  }

  /**
   * Return a Stats object for this inode.
   * @todo Should probably remove this at some point. This isn't the
   *       responsibility of the FileIndex.
   * @return [BrowserFS.node.fs.Stats]
   */
  public getStats(): node_fs_stats.Stats {
    return new Stats(node_fs_stats.FileType.DIRECTORY, 4096, 0x16D);
  }
  /**
   * Returns the directory listing for this directory. Paths in the directory are
   * relative to the directory's path.
   * @return [String[]] The directory listing for this directory.
   */
  public getListing(): string[] {
    return Object.keys(this._ls);
  }
  /**
   * Returns the inode for the indicated item, or null if it does not exist.
   * @param [String] p Name of item in this directory.
   * @return [BrowserFS.FileInode | BrowserFS.DirInode | null]
   */
  public getItem(p: string): Inode {
    var _ref;
    return (_ref = this._ls[p]) != null ? _ref : null;
  }
  /**
   * Add the given item to the directory listing. Note that the given inode is
   * not copied, and will be mutated by the DirInode if it is a DirInode.
   * @param [String] p Item name to add to the directory listing.
   * @param [BrowserFS.FileInode | BrowserFS.DirInode] inode The inode for the
   *   item to add to the directory inode.
   * @return [Boolean] True if it was added, false if it already existed.
   */
  public addItem(p: string, inode: Inode): boolean {
    if (p in this._ls) {
      return false;
    }
    this._ls[p] = inode;
    return true;
  }
  /**
   * Removes the given item from the directory listing.
   * @param [String] p Name of item to remove from the directory listing.
   * @return [BrowserFS.FileInode | BrowserFS.DirInode | null] Returns the item
   *   removed, or null if the item did not exist.
   */
  public remItem(p: string): Inode {
    var item = this._ls[p];
    if (item === undefined) {
      return null;
    }
    delete this._ls[p];
    return item;
  }
}





    var fs = {}
    fs.renameSync = (oldPath, newPath) ->
      nullCheck oldPath
      nullCheck newPath
      data = read oldPath
      remove oldPath
      write newPath, data

    fs.statSync = (path) ->
      nullCheck path
      read path

    fs.realpathSync = (path, cache) ->
      nullCheck path
      # TODO:

    fs.rmdirSync = (path) ->
      nullCheck path
      remove path

    fs.mkdirSync = (path, mode) ->
      nullCheck path
      # ignore mode
      write path, dir()

    fs.readdirSync = (path) ->
      nullCheck path
      # if not stats.isDirectory()
      #   throw new Error "ENOTDIR: not a directory, scandir #{path}"
      children path

    fs.utimesSync = (path, atime, mtime) ->
      nullCheck path
      data = read path
      data.atime = atime
      data.mtime = mtime
      write path, data
      # TODO: return? format?

    fs.readFileSync = (filename, options) ->
      nullCheck filename
      # options are ignored and default to 'utf8'
      data = read filename
      data.content

    fs.writeFileSync = (filename, data, options) ->
      nullCheck filename
      # data is string
      # options are ignored and encoding defaults to 'utf8'
      fileData = file()
      fileData.content = data
      write filename, fileData

    fs.appendFileSync = (filename, data, options) ->
      nullCheck filename
      # data is string
      # options are ignored and encoding defaults to 'utf8'
      fs.writeFileSync (fs.readFileSync filename) + data

    # TODO: maybe add watch??
    #fs.watchFile(filename[, options], listener)

    # Provide async versions
    for name, fun of fs
      fs[name[...-4]] = (args..., callback) ->
        try
          result = fun args...
        catch e
          error = e
        callback error, result

    # special
    fs.existsSync(path)

  {FileSystem}