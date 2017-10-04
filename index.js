'use strict'

const Base = require('bfx-facs-base')

class Api extends Base {
  constructor (caller, opts, ctx) {
    super(caller, opts, ctx)

    this.name = 'api'

    this.init()
  }

  init () {
    super.init()

    const ApiClass = this.getApi(this.opts.path)

    this.api = new ApiClass({
      getCtx: () => {
        return this.caller.getPluginCtx(`api_${this.opts.label}`)
      }
    })
  }

  getApi (name) {
    return require(`${this.caller.ctx.root}/workers/loc.api/${name}`)
  }
}

module.exports = Api
