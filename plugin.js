const fs = require("fs");
const path = require("path");
const glob = require("glob");
const cp = require("child_process");

module.exports = {
  name: "xcode",
  description: "Open xcode (workspace if it finds it, otherwise project",
  options: [
    {
      command: "-a --application",
      description:
        "Only open with main XCode from /Applications. Useful if you have a beta installed."
    }
  ],
  func: (arg, args, options) => {
    const cwd = process.cwd();
    const iosdir = path.join(cwd, "ios");
    if (!fs.existsSync(iosdir)) {
      console.log("Did not find the iOS code in the expected location", iosdir);
      return;
    }
    const workspaceglob = path.join(iosdir, "*.xcworkspace");
    const wgs = glob.sync(workspaceglob);
    var clargs = [];
    if (options.application) {
      clargs.push("-a");
      clargs.push("/Applications/Xcode.app");
    }
    if (wgs && wgs.length) {
      clargs.push(wgs[0]);
      cp.spawn("open", clargs);
      console.log("Opening workspace", clargs);
      return;
    }
    const projectglob = path.join(iosdir, "*.xcodeproj");
    const pgs = glob.sync(projectglob);
    if (pgs && pgs.length) {
      clargs.push(pgs[0]);
      cp.spawn("open", clargs);
      console.log("Opening project", clargs);
      return;
    }
    console.log(
      "Could not find a workspace or a project to work with in",
      iosdir
    );
  }
};
//Check for ios directory
