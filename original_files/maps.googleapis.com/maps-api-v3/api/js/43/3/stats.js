google.maps.__gjsload__('stats', function(_) {
    var qY = function(a) {
            _.D(this, a, 2)
        },
        rY = function(a) {
            _.D(this, a, 6)
        },
        sY = function(a, b, c, d) {
            var e = {};
            e.host = document.location && document.location.host || window.location.host;
            e.v = a;
            e.r = Math.round(1 / b);
            c && (e.client = c);
            d && (e.key = d);
            return e
        },
        tY = function(a) {
            var b = document;
            this.H = Nda;
            this.j = a + "/maps/gen_204";
            this.o = b
        },
        uY = function(a, b, c) {
            var d = [];
            _.wb(a, function(e, f) {
                d.push(f + b + e)
            });
            return d.join(c)
        },
        Oda = function(a) {
            var b = {};
            _.wb(a, function(c, d) {
                b[encodeURIComponent(d)] = encodeURIComponent(c).replace(/%7C/g, "|")
            });
            return uY(b, ":", ",")
        },
        vY = function(a, b, c, d) {
            var e = _.E(_.I, 0, 1);
            this.T = a;
            this.$ = b;
            this.H = e;
            this.j = c;
            this.o = d;
            this.i = new _.lt;
            this.W = _.Ta()
        },
        wY = function(a, b, c, d, e) {
            this.W = a;
            this.$ = b;
            this.T = c;
            this.o = d;
            this.H = e;
            this.j = {};
            this.i = []
        },
        xY = function(a, b, c) {
            var d = _.Hj;
            this.o = a;
            _.M.bind(this.o, "set_at", this, this.H);
            _.M.bind(this.o, "insert_at", this, this.H);
            this.W = b;
            this.$ = d;
            this.T = c;
            this.j = 0;
            this.i = {};
            this.H()
        },
        zY = function(a, b, c, d, e) {
            var f = _.E(_.I, 23, 500);
            var g = _.E(_.I, 22, 2);
            this.ka = a;
            this.ta = b;
            this.ua = f;
            this.H =
                g;
            this.$ = c;
            this.T = d;
            this.W = e;
            this.j = new _.lt;
            this.i = 0;
            this.o = _.Ta();
            yY(this)
        },
        yY = function(a) {
            window.setTimeout(function() {
                Pda(a);
                yY(a)
            }, Math.min(a.ua * Math.pow(a.H, a.i), 2147483647))
        },
        Pda = function(a) {
            var b = sY(a.ta, a.$, a.T, a.W);
            b.t = a.i + "-" + (_.Ta() - a.o);
            a.j.forEach(function(c, d) {
                c = c();
                0 < c && (b[d] = Number(c.toFixed(2)) + (_.Io() ? "-if" : ""))
            });
            a.ka.i({
                ev: "api_snap"
            }, b);
            ++a.i
        },
        AY = function() {
            this.j = _.F(_.I, 6);
            this.o = _.F(_.I, 16);
            if (_.vh[35]) {
                var a = _.Kd(_.I);
                a = _.F(a, 11)
            } else a = _.uu;
            this.i = new tY(a);
            (a = _.Gj) && new xY(a,
                (0, _.y)(this.i.i, this.i), !!this.j);
            a = _.F(new _.Pd(_.I.V[3]), 1);
            this.ka = a.split(".")[1] || a;
            this.ua = {};
            this.$ = {};
            this.W = {};
            this.ta = _.E(_.I, 0, 1);
            _.rg && (this.ya = new zY(this.i, this.ka, this.ta, this.j, this.o));
            a = this.T = new rY;
            var b = _.F(new _.Pd(_.I.V[3]), 1);
            a.V[1] = b;
            this.j && (this.T.V[2] = this.j);
            this.o && (this.T.V[3] = this.o)
        };
    _.z(qY, _.C);
    var BY;
    _.z(rY, _.C);
    var Nda = Math.round(1E15 * Math.random()).toString(36);
    tY.prototype.i = function(a, b) {
        b = b || {};
        var c = _.Um().toString(36);
        b.src = "apiv3";
        b.token = this.H;
        b.ts = c.substr(c.length - 6);
        a.cad = Oda(b);
        a = uY(a, "=", "&");
        a = this.j + "?target=api&" + a;
        _.Oc(new _.Nc(this.o), "IMG").src = a;
        (b = _.t.__gm_captureCSI) && b(a)
    };
    vY.prototype.ka = function(a, b) {
        b = void 0 !== b ? b : 1;
        this.i.isEmpty() && window.setTimeout((0, _.y)(function() {
            var c = sY(this.$, this.H, this.j, this.o);
            c.t = _.Ta() - this.W;
            var d = this.i;
            _.ot(d);
            for (var e = {}, f = 0; f < d.i.length; f++) {
                var g = d.i[f];
                e[g] = d.j[g]
            }
            _.zb(c, e);
            this.i.clear();
            this.T.i({
                ev: "api_maprft"
            }, c)
        }, this), 500);
        b = this.i.get(a, 0) + b;
        this.i.set(a, b)
    };
    wY.prototype.ka = function(a) {
        this.j[a] || (this.j[a] = !0, this.i.push(a), 2 > this.i.length && _.kz(this, this.ta, 500))
    };
    wY.prototype.ta = function() {
        for (var a = sY(this.$, this.T, this.o, this.H), b = 0, c; c = this.i[b]; ++b) a[c] = "1";
        a.hybrid = +_.Tt();
        this.i.length = 0;
        this.W.i({
            ev: "api_mapft"
        }, a)
    };
    xY.prototype.H = function() {
        for (var a; a = this.o.removeAt(0);) {
            var b = a.Tn;
            a = a.timestamp - this.$;
            ++this.j;
            this.i[b] || (this.i[b] = 0);
            ++this.i[b];
            if (20 <= this.j && !(this.j % 5)) {
                var c = {};
                c.s = b;
                c.sr = this.i[b];
                c.tr = this.j;
                c.te = a;
                c.hc = this.T ? "1" : "0";
                this.W({
                    ev: "api_services"
                }, c)
            }
        }
    };
    zY.prototype.register = function(a, b) {
        this.j.set(a, b)
    };
    AY.prototype.Ea = function(a) {
        a = _.rf(a);
        var b = this.ua[a];
        b || (b = new wY(this.i, this.ka, this.ta, this.j, this.o), this.ua[a] = b);
        return b
    };
    AY.prototype.va = function(a) {
        a = _.rf(a);
        this.$[a] || (this.$[a] = new vY(this.i, this.ka, this.j, this.o));
        return this.$[a]
    };
    AY.prototype.H = function(a) {
        if (this.ya) {
            this.W[a] || (this.W[a] = new _.RK, this.ya.register(a, function() {
                return b.mc()
            }));
            var b = this.W[a];
            return b
        }
    };
    AY.prototype.Pa = function(a) {
        if (_.rg) {
            var b = this.T.clone(),
                c = Math.floor(_.Ta() / 1E3);
            b.V[0] = c;
            c = new qY(_.G(b, 5));
            c.V[0] = Math.round(1 / this.ta);
            c.V[1] = a;
            a = this.i;
            c = {
                ev: "api_map_style"
            };
            var d = new _.ns;
            BY || (BY = {
                ha: "issssm",
                ma: ["is"]
            });
            b = d.i(b.V, BY);
            c.pb = encodeURIComponent(b).replace(/%20/g, "+");
            b = uY(c, "=", "&");
            _.Oc(new _.Nc(a.o), "IMG").src = a.j + "?target=api&" + b
        }
    };
    _.df("stats", new AY);
});