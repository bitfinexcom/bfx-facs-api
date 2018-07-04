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
    const loc = `${this.caller.ctx.root}/workers/loc.api/${name}`

    try {
      return require(loc)
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        console.error(`[ERR] automatic worker lookup for location ${loc} failed.`)
        console.error('[ERR] to fix, create the missing file.')
        console.error('[ERR] for special use cases, you can also override `getApiConf`')
      }

      throw e
    }
  }
}

module.exports = Api
