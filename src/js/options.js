Log.options = {

  /**
   * Update data and settings
   */
  update: {

    /**
     * Update localStorage
     */
    localStorage() {
      localStorage.setItem('user', JSON.stringify(user));
      secDetailCache = {};
      proDetailCache = {};
      journalCache = {};
      console.log('localStorage updated')
      Log.refresh();
    },

    /**
     * Update config
     */
    config() {
      dataStore.set('config', user.config);
      Log.config = user.config;
      console.log('Config updated')
      Log.options.update.localStorage();
    },

    /**
     * Update palette
     */
    palette() {
      if (user.palette === {}) {
        console.error('Sector palette is empty');
        return;
      }

      dataStore.set('palette', user.palette);
      Log.palette = user.palette;
      console.log('Sector palette updated')
      Log.options.update.localStorage();
    },

    /**
     * Update project palette
     */
    projectPalette() {
      if (user.projectPalette === {}) {
        console.error('Project palette is empty');
        return;
      }

      dataStore.set('projectPalette', user.projectPalette);
      Log.projectPalette = user.projectPalette;
      console.log('Project palette updated')
      Log.options.update.localStorage();
    },

    /**
     * Update log
     */
    log() {
      if (user.log.length === 0) {
        console.error('User log is empty');
        return;
      }

      dataStore.set('log', user.log);
      Log.log = Log.data.parse(user.log);
      console.log('Log updated')
      Log.options.update.localStorage();
    },

    /**
     * Update all
     */
    all() {
      Log.options.update.config();
      Log.options.update.palette();
      Log.options.update.projectPalette();
      Log.options.update.log();
      Log.options.update.localStorage();
    },
  },

  /**
   * Set background colour
   * @param {string} c - Colour
   */
  setBG(c) {
    if (typeof c !== 'string' || c.length === 0) return;
    user.config.ui.bg = c;
    ui.style.backgroundColor = c;
    Log.options.update.config();
  },

  /**
   * Set text colour
   * @param {string} c - Colour
   */
  setColour(c) {
    if (typeof c !== 'string' || c.length === 0) return;
    user.config.ui.colour = c;
    ui.style.color = c;
    Log.options.update.config();
  },

  /**
   * Set accent colour
   * @param {string} c - Colour
   */
  setAccent(c) {
    if (typeof c !== 'string' || c.length === 0) return;
    user.config.ui.accent = c;
    Log.options.update.config();
  },

  /**
   * Set colour mode
   * @param {string} m - Mode
   */
  setColourMode(m) {
    if (m === undefined) return;
    if (typeof m !== 'string' || m.length === 0) return;
    if (['sector', 'project', 'none'].indexOf(m) === -1) return;
    user.config.ui.colourMode = m;
    Log.options.update.config();
  },

  /**
   * Set sector colour code
   * @param {string} m - Sector or project
   * @param {string} s - Sector or project name
   * @param {string} c - Colour
   */
  setColourCode(m, s, c) {
    if (m === undefined || s === undefined || c === undefined) return;
    if (typeof m !== 'string') return;
    if (['sector', 'sec', 'project', 'pro'].indexOf(m) === -1)
    if (typeof s !== 'string' || s.length === 0) return;
    if (typeof c !== 'string' || c.length === 0) return;

    if (m === 'sector' || m === 'sec') {
      user.palette[s] = c;
      Log.options.update.palette();
    } else {
      user.projectPalette[s] = c;
      Log.options.update.projectPalette();
    }
  },

  /**
   * Set overview (days to show)
   * @param {number} n - Number of days
   */
  setView(n) {
    if (n === undefined) return;
    if (typeof n !== 'number' || n < 0) return;
    user.config.ui.view = n;
    Log.options.update.config();
  },

  /**
   * Set calendrical system
   * @param {string} c - Calendrical system
   */
  setCalendar(c) {
    if (c === undefined) return;
    if (typeof c !== 'string' || c.length === 0) return;
    if (['aequirys', 'monocal', 'gregorian'].indexOf(c) === -1) return;
    user.config.system.calendar = c;
    Log.options.update.config();
  },

  /**
   * Set time format
   * @param {string} f - Format
   */
  setTimeFormat(f) {
    if (f === undefined) return;
    if (typeof f !== 'string' || f.length === 0) return;
    if (['24', '12', 'decimal'].indexOf(f) === -1) return;
    user.config.system.timeFormat = f;
    Log.options.update.config();
  },

  setStat(f) {
    if (f === undefined) return;
    if (typeof f !== 'string' || f.length === 0) return;
    if (['decimal', 'human'].indexOf(f) === -1) return;
    user.config.ui.stat = f;
    Log.options.update.config();
  }
};
