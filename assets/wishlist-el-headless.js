import {
  delayWhen as p,
  from as a,
  fromEvent as o,
  isObservable as u,
  map as f,
  of as h,
} from "https://cdn.jsdelivr.net/npm/rxjs@7.8.0/+esm";
import {
  filter as l,
  first as b,
  switchMap as v,
  tap as c,
} from "https://cdn.jsdelivr.net/npm/rxjs@7.8.0/+esm";
import { WishlistStateController as g } from "https://cdn.jsdelivr.net/npm/@appmate/wishlist@4.25.18/controllers.js";
var d = class {
  constructor(t) {
    this.connected = !1;
    this.cleanupMethods = [];
    this.eventPending = !1;
    this.firstConnect = !0;
    if (
      ((this.host = t),
      (this.stateCtrl = new g(this)),
      this.host.hasAttribute("wk-headless"))
    )
      throw new Error("Headless component already initialised");
    this.host.setAttribute("wk-headless", ""),
      this.host.setAttribute("wk-skip", ""),
      this.initEvents(),
      this.connect(),
      (this.firstConnect = !1);
  }
  get app() {
    return this.stateCtrl.app;
  }
  static get observedAttributes() {
    return [
      "data-wishlist-id",
      "data-wishlist-item-id",
      "data-product-handle",
      "data-product-id",
      "data-variant-id",
    ];
  }
  addController(t) {}
  appReadyCallback() {
    this.host.dataset.productHandle &&
      this.app.events.subscribe("wk:product:change-variant:success", (t) => {
        var i, n, e;
        if (
          this.host.dataset.productHandle ===
            ((i = t.data) == null ? void 0 : i.productHandle) &&
          (n = t.data) != null &&
          n.variantId
        ) {
          let r = this.productInfo ? this.productInfo.wishlistItemId : void 0,
            s = this.productInfo ? this.productInfo.variantId : void 0;
          r &&
            !s &&
            this.app.updateWishlistItem({
              wishlistItemId: r,
              changes: {
                variantId: (e = t.data) == null ? void 0 : e.variantId,
              },
            }),
            (this.host.dataset.variantId = t.data.variantId.toString()),
            this.connected && this.initState();
        }
      });
  }
  async connect() {
    if (!this.connected) {
      if (!this.app.stylesLoaded) {
        o(document, "wk:app:load-styles:success")
          .pipe(b())
          .subscribe(() => this.connect());
        return;
      }
      (this.connected = !0),
        this.app.loaded
          ? this.init()
          : this.app.hasSession
          ? (await this.app.load(), this.init())
          : (this.initFallbackState(),
            this.app.events.once("wk:app:loaded", () => {
              this.init();
            }));
    }
  }
  getStateConfig() {
    return {};
  }
  init() {
    let { loading: t } = this.getStateConfig();
    t === "lazy"
      ? (this.initFallbackState(), this.initObserver())
      : (this.initState(), this.appReadyCallback());
  }
  updated() {}
  setState(t) {
    (this.wishlist = t.wishlist),
      (this.wishlistItem = t.wishlistItem),
      (this.productInfo = t.productInfo),
      this.updated();
  }
  createRenderRoot() {
    return this;
  }
  initState() {
    this.subscription && this.subscription.unsubscribe(),
      (this.subscription = this.stateCtrl.observe().subscribe((t) => {
        this.setState(t);
      }));
  }
  initFallbackState() {
    let t = this.stateCtrl.getFallback();
    t && this.setState(t);
  }
  initObserver() {
    var t;
    (t = this.observer) == null || t.disconnect(),
      (this.observer = new IntersectionObserver(
        (i) => this.handleIntersect(i),
        {
          root: null,
          rootMargin: "0px",
        }
      )),
      this.host.setAttribute("wk-lazy", ""),
      this.observer.observe(this.host);
  }
  handleIntersect([t]) {
    var i;
    t.isIntersecting &&
      (this.host.removeAttribute("wk-lazy"),
      (i = this.observer) == null || i.disconnect(),
      this.initState(),
      this.appReadyCallback());
  }
  getEventConfig() {
    return {};
  }
  initEvents() {
    let t = this.getEventConfig();
    if (!t) return;
    let i = Object.entries(t).map(([n, e]) => {
      let [r, s] = n.split(/ (.*)/s);
      return this.subscribeToEvent({
        eventName: r,
        selector: s,
        handler: e,
      });
    });
    this.cleanupMethods.push(() => i.forEach((n) => n.unsubscribe()));
  }
  subscribeToEvent({ eventName: t, handler: i, selector: n }) {
    return o(this.host, t)
      .pipe(
        c((e) => {
          this.eventPending && e.preventDefault();
        }),
        l(() => !this.eventPending),
        c(() => {
          this.eventPending = !0;
        }),
        f((e) =>
          e.target instanceof Element
            ? {
                event: e,
                target: n ? e.target.closest(n) : e.currentTarget,
              }
            : {
                event: e,
                target: null,
              }
        ),
        l(({ target: e }) => !!e),
        p((e) => (this.app.hasSession ? h(e) : a(this.app.load()))),
        v(({ event: e, target: r }) => {
          let s = i.bind(this)(e, r);
          return u(s)
            ? s
            : typeof (s == null ? void 0 : s.then) == "function"
            ? a(s)
            : h(s);
        })
      )
      .subscribe(() => {
        this.eventPending = !1;
      });
  }
};
export { d as WishlistElementHeadless };
