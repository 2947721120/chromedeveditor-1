

    Polymer('core-doc-viewer', {
      /**
       * A single file to parse for docs
       *
       * @attribute url
       * @type String
       * @default ''
       */

      /**
       * Class documentation extracted from the parser
       *
       * @property classes
       * @type Array
       * @default []
       */
      classes: [],

      /**
       * Files to parse for docs
       *
       * @attribute sources
       * @type Array
       * @default []
       */
      sources: [],

      ready: function() {
        window.addEventListener('hashchange', this.parseLocationHash.bind(this));
        this.parseLocationHash();
      },

      parseLocationHash: function() {
        this.route = window.location.hash.slice(1);
      },

      routeChanged: function() {
        this.validateRoute();
      },

      validateRoute: function() {
        if (this.route) {
          this.classes.some(function(c) {
            if (c.name === this.route) {
              this.data = c;
              this.route = '';
              return;
            }
          }, this);
        }
      },

      selectedChanged: function() { 
        this.data = this.classes[this.selected];
      },

      parserDataReady: function(event) {
        this.assimilateData(event.target.data);
      },

      assimilateData: function(data) {
        this.classes = this.classes.concat(data.classes);
        this.classes.sort(function(a, b) {
          var na = a && a.name.toLowerCase(), nb = b && b.name.toLowerCase();
          return (na < nb) ? -1 : (na == nb) ? 0 : 1;
        });
        if (!this.data && !this.route && this.classes.length) {
          this.data = this.classes[0];
        }
        if (this.classes.length > 1) {
          this.$.toc.style.display = 'block';
        }
        this.validateRoute();
      }

    });

  