/* Offline: never sends real analytics or navigates to Airbnb. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
let checks = 0;
function load(file, context) {
  const sandbox = { exports: {}, ...context };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, sandbox);
  return sandbox.exports;
}
const events = [];
const window = { gtag: (...args) => events.push(args) };
const analytics = load("src/lib/bookingAnalytics.ts", { window });
const component = load("src/components/common/AirbnbRoomLinks.tsx", {
  require: name => {
    if (name === "src/lib/bookingAnalytics") return analytics;
    if (name === "react-i18next") return { useTranslation: () => ({ t: key => key }) };
    return require(name);
  },
}).default;
for (const location of ["reservation_page", "booking_modal"]) {
  const links = component({ linkLocation: location }).props.children;
  links.forEach((link, index) => {
    assert.equal(link.type, "a");
    assert.equal(link.props.href, `https://airbnb.co.kr/h/yeoyeo${index + 1}`);
    assert.equal(link.props.target, undefined);
    const before = events.length;
    // No preventDefault, timeout, promise, or delayed navigation is necessary.
    link.props.onClick({ preventDefault: () => { throw Error("Navigation blocked"); } });
    assert.equal(events.length, before + 1);
    assert.equal(JSON.stringify(events.at(-1)), JSON.stringify([
      "event", "airbnb_booking_click", {
        room_name: index ? "yeohaeng" : "yeoyu",
        link_location: location,
        transport_type: "beacon",
      },
    ]));
    checks += 5;
    link.props.onClick();
    assert.equal(events.length, before + 2, "Repeated deliberate clicks are counted once each");
    checks++;
  });
}
for (const context of [{}, { window: {} }, { window: { gtag: null } }, { window: { gtag: () => { throw Error("blocked"); } } }]) {
  const safe = load("src/lib/bookingAnalytics.ts", context);
  assert.doesNotThrow(() => safe.trackAirbnbBookingClick("yeoyu", "booking_modal"));
  checks++;
}
for (const [file, location] of [
  ["src/pages/reservation/index.tsx", "reservation_page"],
  ["src/components/common/LinkSelectModal.tsx", "booking_modal"],
]) {
  assert.ok(fs.readFileSync(file, "utf8").includes(`<AirbnbRoomLinks linkLocation="${location}" />`));
  checks++;
}
console.log(`Passed ${checks} offline booking analytics checks.`);
