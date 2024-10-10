window.initListener = function () {
  const eventToFnMap = {
    "start-true": () => window.emulator.setJoypStart(true),
    "start-false": () => window.emulator.setJoypStart(false),
    "select-true": () => window.emulator.setJoypSelect(true),
    "select-false": () => window.emulator.setJoypSelect(false),
    "a-true": () => window.emulator.setJoypA(true),
    "a-false": () => window.emulator.setJoypA(false),
    "b-true": () => window.emulator.setJoypB(true),
    "b-false": () => window.emulator.setJoypB(false),
    "up-true": () => window.emulator.setJoypUp(true),
    "up-false": () => window.emulator.setJoypUp(false),
    "down-true": () => window.emulator.setJoypDown(true),
    "down-false": () => window.emulator.setJoypDown(false),
    "left-true": () => window.emulator.setJoypLeft(true),
    "left-false": () => window.emulator.setJoypLeft(false),
    "right-true": () => window.emulator.setJoypRight(true),
    "right-false": () => window.emulator.setJoypRight(false),
  };
  addEventListener("message", (event) => {
    const messageFn = eventToFnMap[event.data];
    if (typeof messageFn !== "undefined") {
      messageFn();
    }
  });
};
